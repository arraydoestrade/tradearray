import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { insertUserSchema, traderRoles } from '../../../shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  { id: 'username', label: 'Username', placeholder: 'Enter your username', type: 'text' },
  { id: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { id: 'password', label: 'Password', placeholder: 'Create a secure password', type: 'password' },
  { id: 'knownAs', label: 'Known As', placeholder: 'Select your role', type: 'dropdown' },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof insertUserSchema>>({
    username: '',
    email: '',
    password: '',
    knownAs: 'Algorithmic Trader',
  });

  const registerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertUserSchema>) => {
      return await apiRequest('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        setLocation('/me');
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: 'Registration failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    },
  });

  const currentStepData = steps[currentStep];
  const currentValue = formData[currentStepData.id as keyof z.infer<typeof insertUserSchema>];

  const handleNext = () => {
    const fieldName = currentStepData.id as keyof z.infer<typeof insertUserSchema>;
    const fieldValue = formData[fieldName];
    
    if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === '')) {
      toast({
        title: 'Field required',
        description: `Please enter your ${currentStepData.label.toLowerCase()}.`,
        variant: 'destructive',
      });
      return;
    }

    // Validate email format
    if (fieldName === 'email') {
      const email = fieldValue as string;
      const validDomains = ['.com', '.net', '.org', '.edu', '.gov', '.io', '.co', '.uk', '.us', '.ca', '.de', '.fr', '.jp', '.cn', '.au', '.ru', '.es', '.it', '.nl', '.se', '.no', '.fi', '.dk', '.pl', '.ch', '.at', '.be', '.pt', '.gr', '.cz', '.ie', '.nz', '.sg', '.hk', '.mx', '.br', '.in', '.kr', '.za', '.ar', '.cl', '.pe', '.ve', '.co.uk', '.ac.uk', '.com.au', '.co.nz', '.co.za'];
      if (!email.includes('@') || !validDomains.some(domain => email.toLowerCase().endsWith(domain))) {
        toast({
          title: 'Invalid email',
          description: 'Email must contain @ and a valid domain (.com, .net, .org, etc.)',
          variant: 'destructive',
        });
        return;
      }
    }

    // Validate password length
    if (fieldName === 'password') {
      const password = fieldValue as string;
      if (password.length < 6) {
        toast({
          title: 'Invalid password',
          description: 'Password must be at least 6 characters',
          variant: 'destructive',
        });
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      registerMutation.mutate(formData);
    }
  };

  const handleChange = (value: string) => {
    setFormData({
      ...formData,
      [currentStepData.id]: value,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" data-testid="register-page">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video 
          src="/b2b.mp4" 
          autoPlay 
          playsInline 
          muted 
          loop 
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {
              setTimeout(() => video.play().catch(() => {}), 100);
            });
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-1"></div>
      </div>

      <div className="relative z-2 flex flex-col items-center gap-12 max-w-[600px] w-[90%] p-8">
        {!showSuccess && (
          <>
            <div className="flex items-center gap-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`
                    w-2.5 h-2.5 rounded-full border transition-all duration-500
                    ${index === currentStep ? 'bg-blue-400/90 border-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.5)] scale-125' : ''}
                    ${index < currentStep ? 'bg-white/90 border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]' : ''}
                    ${index > currentStep ? 'bg-white/15 border-white/25' : ''}
                  `}
                  data-testid={`progress-dot-${index}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: index === currentStep ? 1.25 : 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              ))}
            </div>

            <div className="w-full min-h-[350px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 60, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -60, filter: 'blur(4px)' }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="w-full flex flex-col items-center gap-6"
                >
                  <motion.h2 
                    className="font-inter text-[clamp(1.75rem,4vw,2.5rem)] font-light text-white text-center tracking-tight m-0"
                    data-testid="register-step-label"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {currentStepData.label}
                  </motion.h2>
                  
                  {currentStepData.type === 'dropdown' ? (
                    <motion.div 
                      className="w-full max-w-[450px] relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <select
                        className="w-full px-5 py-3.5 font-inter text-[clamp(1rem,2.5vw,1.25rem)] font-light text-white text-center bg-white/5 border border-white/15 rounded-xl outline-none transition-all duration-300 focus:border-blue-400/50 focus:shadow-[0_0_24px_rgba(96,165,250,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] focus:bg-white/8 backdrop-blur-xl appearance-none cursor-pointer bg-[url('data:image/svg+xml,%3Csvg%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%20fill=%27none%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201L6%206L11%201%27%20stroke=%27rgba(255,255,255,0.6)%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1.25rem_center] pr-12 hover:border-white/25 hover:bg-white/10"
                        data-testid="input-knownAs"
                        value={currentValue as string}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        autoFocus
                      >
                        {traderRoles.map((role) => (
                          <option key={role} value={role} className="bg-[#0a0a0a] text-white py-3">
                            {role}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  ) : (
                    <motion.input
                      className="w-full max-w-[450px] px-5 py-3.5 font-inter text-[clamp(1rem,2.5vw,1.25rem)] font-light text-white text-center bg-white/5 border border-white/15 rounded-xl outline-none transition-all duration-300 placeholder:text-white/35 focus:border-blue-400/50 focus:shadow-[0_0_24px_rgba(96,165,250,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] focus:bg-white/8 backdrop-blur-xl hover:border-white/25 hover:bg-white/10"
                      data-testid={`input-${currentStepData.id}`}
                      type={currentStepData.type}
                      placeholder={currentStepData.placeholder}
                      value={currentValue as string}
                      onChange={(e) => handleChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      autoFocus
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  )}

                  <motion.button
                    className="relative w-full max-w-[450px] px-6 py-2.5 font-inter text-xs font-medium text-white bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/20 rounded-full cursor-pointer transition-all duration-500 tracking-widest outline-none overflow-hidden group hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(96,165,250,0.2),inset_0_0_20px_rgba(96,165,250,0.1)] disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full"
                    data-testid="button-next"
                    onClick={handleNext}
                    disabled={registerMutation.isPending}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 uppercase">
                      {registerMutation.isPending ? 'Processing...' : currentStep < steps.length - 1 ? 'Next' : 'Complete'}
                    </span>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400/40 flex items-center justify-center backdrop-blur-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Check className="w-12 h-12 text-green-400" strokeWidth={3} />
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-3xl font-light text-white mb-2">Welcome to Array</h2>
                <p className="text-white/60 text-sm">Redirecting to your profile...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
