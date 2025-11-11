import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import { useEffect } from 'react';
import type { User } from '../../../shared/schema';

export default function Me() {
  const [, setLocation] = useLocation();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['/api/me'],
  });

  useEffect(() => {
    if (error) {
      setLocation('/auth');
    }
  }, [error, setLocation]);

  if (isLoading) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video 
            src="/b2b.mp4" 
            autoPlay 
            playsInline 
            muted 
            loop 
            preload="auto"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-1"></div>
        </div>
        <motion.div
          className="relative z-2 text-white text-xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isLinked = user.discordId && user.discordUsername;

  const handleLinkDiscord = () => {
    window.location.href = '/api/auth/discord';
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black" data-testid="me-page">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video 
          src="/b2b.mp4" 
          autoPlay 
          playsInline 
          muted 
          loop 
          preload="auto"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-1"></div>
      </div>

      <div className="relative z-2 flex flex-col items-center gap-8 max-w-[600px] w-[90%] p-8">
        <motion.div
          className="w-full max-w-[500px] p-8 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.h1
              className="text-3xl font-light text-white text-center tracking-tight"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Hey {user.username}!
            </motion.h1>

            {!isLinked ? (
              <motion.div
                className="flex flex-col items-center gap-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 border border-white/20">
                  <LinkIcon className="w-10 h-10 text-white/60" />
                </div>
                
                <div className="text-center">
                  <p className="text-white/90 text-lg mb-2">Link your Discord account</p>
                  <p className="text-white/50 text-sm">
                    Connect your Discord to access your profile
                  </p>
                </div>

                <button
                  onClick={handleLinkDiscord}
                  className="relative flex items-center justify-center gap-2 w-auto px-6 py-3 font-inter text-sm font-medium text-white bg-[#5865F2] border border-[#5865F2] rounded-xl cursor-pointer transition-all duration-500 uppercase tracking-widest outline-none overflow-hidden group hover:shadow-[0_0_30px_rgba(88,101,242,0.3),inset_0_0_20px_rgba(88,101,242,0.1)] backdrop-blur-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full"
                  data-testid="button-link-discord"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <SiDiscord className="w-4 h-4" />
                    Connect Discord
                  </span>
                </button>

                <motion.div
                  className="mt-2 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className="text-white/70 text-sm text-center leading-relaxed">
                    This is your personal area, since array is still on development you might be selected for beta testings
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center gap-5 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={user.discordAvatar || ''}
                    alt={user.discordUsername || 'Discord User'}
                    className="w-24 h-24 rounded-full border-2 border-white/20"
                    data-testid="discord-avatar"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-medium text-white mb-1" data-testid="discord-username">
                    {user.discordUsername}
                  </h2>
                  <p className="text-white/40 text-xs font-mono" data-testid="discord-id">
                    ID: {user.discordId}
                  </p>
                </motion.div>

                <motion.a
                  href="https://discord.gg/yourserver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 font-inter text-sm font-semibold text-white bg-[#5865F2]/85 border border-[#5865F2]/30 rounded-xl cursor-pointer transition-all duration-300 uppercase tracking-wider outline-none hover:bg-[#5865F2]/95 hover:shadow-[0_0_24px_rgba(88,101,242,0.3),0_4px_16px_rgba(88,101,242,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_16px_rgba(88,101,242,0.25)] backdrop-blur-sm"
                  data-testid="button-discord-server"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Join Server
                  <ExternalLink className="w-4 h-4" />
                </motion.a>

                <motion.div
                  className="mt-4 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <p className="text-white/70 text-sm text-center leading-relaxed">
                    This is your personal area, since array is still on development you might be selected for beta testings
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
