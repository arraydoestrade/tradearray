import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { loginSchema } from '../../../shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/60 to-black/70 z-1"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 rounded-3xl backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 sm:p-10">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl sm:text-4xl font-extralight text-white tracking-tight mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome Back
            </motion.h1>
            
            <motion.p 
              className="text-sm font-light text-white/50 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Sign in to continue to ARRAY
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Mail className="w-4 h-4 text-white/40 transition-colors duration-300 group-focus-within:text-blue-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 text-sm font-light text-white bg-white/[0.06] border border-white/20 rounded-2xl outline-none transition-all duration-300 placeholder:text-white/30 focus:border-blue-400/60 focus:shadow-[0_0_30px_rgba(96,165,250,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] focus:bg-white/[0.1] backdrop-blur-xl hover:border-white/30 hover:bg-white/[0.08]"
                data-testid="input-email"
              />
            </motion.div>

            <motion.div 
              className="relative group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Lock className="w-4 h-4 text-white/40 transition-colors duration-300 group-focus-within:text-blue-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 text-sm font-light text-white bg-white/[0.06] border border-white/20 rounded-2xl outline-none transition-all duration-300 placeholder:text-white/30 focus:border-blue-400/60 focus:shadow-[0_0_30px_rgba(96,165,250,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] focus:bg-white/[0.1] backdrop-blur-xl hover:border-white/30 hover:bg-white/[0.08]"
                data-testid="input-password"
              />
            </motion.div>

            <motion.div 
              className="flex items-center justify-between text-xs pt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                type="button"
                onClick={() => setLocation('/about')}
                className="text-white/50 hover:text-white transition-all duration-300 font-light hover:underline decoration-white/30 underline-offset-2"
                data-testid="link-about"
              >
                Create account
              </button>
              <button
                type="button"
                className="text-white/50 hover:text-white transition-all duration-300 font-light hover:underline decoration-white/30 underline-offset-2"
              >
                Forgot password?
              </button>
            </motion.div>

            <motion.button
              type="submit"
              className="relative w-full mt-6 px-6 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-400/30 rounded-full cursor-pointer transition-all duration-500 tracking-wide outline-none overflow-hidden group hover:border-blue-400/50 hover:shadow-[0_0_40px_rgba(96,165,250,0.3),inset_0_0_25px_rgba(96,165,250,0.15)] disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full"
              disabled={loginMutation.isPending}
              data-testid="button-login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loginMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </span>
            </motion.button>
          </form>

          <motion.div 
            className="relative my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/15"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gradient-to-r from-transparent via-black/60 to-transparent px-4 text-white/40 font-light tracking-wide">
                Or continue with
              </span>
            </div>
          </motion.div>

          <motion.button
            type="button"
            onClick={handleDiscordLogin}
            className="relative flex items-center justify-center gap-2.5 w-full px-6 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-[#5865F2]/25 to-[#5865F2]/25 border border-[#5865F2]/30 rounded-full cursor-pointer transition-all duration-500 tracking-wide outline-none overflow-hidden group hover:border-[#5865F2]/50 hover:shadow-[0_0_35px_rgba(88,101,242,0.3),inset_0_0_25px_rgba(88,101,242,0.15)] backdrop-blur-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/12 before:to-transparent before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full"
            data-testid="button-discord-login"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
              </svg>
              <span>Discord</span>
            </span>
          </motion.button>

          <motion.p 
            className="text-center text-xs text-white/30 mt-6 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
