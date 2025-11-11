import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { loginSchema } from '../../../shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Auth() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      const playAttempt = setInterval(() => {
        video.play()
          .then(() => clearInterval(playAttempt))
          .catch(() => {});
      }, 100);

      setTimeout(() => clearInterval(playAttempt), 3000);
    });
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      return await apiRequest('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setLocation('/me');
    },
    onError: (error: any) => {
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid credentials',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: 'Fields required',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Invalid password',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    loginMutation.mutate(formData);
  };

  const handleDiscordLogin = () => {
    window.location.href = '/api/auth/discord';
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" data-testid="auth-page">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          src="/b2b.mp4" 
          autoPlay 
          playsInline 
          muted 
          loop 
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: 'none'
          }}
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {
              setTimeout(() => video.play().catch(() => {}), 100);
            });
          }}
          onClick={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/60 via-black/70 to-black/80 z-1"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[540px] px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 sm:pb-5 border-b border-white/5">
            <h2 className="text-lg sm:text-xl font-light text-white tracking-tight">
              Sign in to ARRAY
            </h2>
            <p className="text-[11px] sm:text-xs text-white/40 mt-1 font-light">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-5 sm:py-6 space-y-3 sm:space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[11px] sm:text-xs text-white/50 font-light tracking-wide block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-white bg-white/5 border border-white/10 rounded-lg outline-none transition-all duration-200 placeholder:text-white/25 focus:border-white/30 focus:bg-white/8 hover:border-white/20"
                data-testid="input-email"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] sm:text-xs text-white/50 font-light tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] sm:text-xs text-white/40 hover:text-white/70 transition-colors font-light"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-white bg-white/5 border border-white/10 rounded-lg outline-none transition-all duration-200 placeholder:text-white/25 focus:border-white/30 focus:bg-white/8 hover:border-white/20"
                data-testid="input-password"
              />
            </div>

            <div className="flex items-center justify-center pt-2 sm:pt-3">
              <button
                type="submit"
                className="min-w-[140px] px-6 sm:px-10 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium text-white bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-all duration-200 outline-none overflow-hidden hover:bg-white/15 hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3 h-3 flex-shrink-0" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative px-6 sm:px-8">
            <div className="absolute inset-x-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black/40 px-3 text-[9px] sm:text-[10px] text-white/30 font-light tracking-widest uppercase">
                Or
              </span>
            </div>
          </div>

          {/* Discord button */}
          <div className="px-6 sm:px-8 py-5 sm:py-6 pt-4 sm:pt-5 flex justify-center">
            <button
              type="button"
              onClick={handleDiscordLogin}
              className="min-w-[180px] px-5 sm:px-7 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium text-white bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-lg cursor-pointer transition-all duration-200 outline-none overflow-hidden hover:bg-[#5865F2]/20 hover:border-[#5865F2]/30 flex items-center justify-center gap-2 whitespace-nowrap"
              data-testid="button-discord-login"
            >
              <svg width="16" height="16" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
              </svg>
              <span>Continue with Discord</span>
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 pb-5 sm:pb-6 flex items-center justify-center gap-1 text-[10px] sm:text-[11px]">
            <span className="text-white/30 font-light">Don't have an account?</span>
            <button
              type="button"
              onClick={() => setLocation('/about')}
              className="text-white/60 hover:text-white transition-colors font-light underline decoration-white/20 underline-offset-2"
              data-testid="link-about"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Terms footer */}
        <p className="text-center text-[9px] sm:text-[10px] text-white/20 mt-3 sm:mt-4 font-light px-4">
          By continuing, you agree to ARRAY's Terms and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
