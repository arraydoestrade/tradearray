import { useState, useEffect } from 'react';
import { X, Monitor, Smartphone } from 'lucide-react';

export default function MobileWarningPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsVisible(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Auto-hide after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    // Stop animation after 3 seconds
    const animTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(animTimer);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let tapTimer: NodeJS.Timeout;

    const handleTap = () => {
      setTapCount(prev => prev + 1);
      
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => {
        setTapCount(0);
      }, 300);
    };

    document.addEventListener('touchstart', handleTap);

    return () => {
      document.removeEventListener('touchstart', handleTap);
      clearTimeout(tapTimer);
    };
  }, [isVisible]);

  useEffect(() => {
    if (tapCount >= 2) {
      setIsVisible(false);
    }
  }, [tapCount]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isMobile || !isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-in fade-in duration-300"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(4px)'
      }}
      data-testid="mobile-warning-overlay"
    >
      <div 
        className="relative max-w-xs w-full p-6 rounded-2xl animate-in zoom-in-95 duration-500"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}
        data-testid="mobile-warning-popup"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover-elevate active-elevate-2 transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
          data-testid="button-close-popup"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Animation Container */}
        <div className="flex items-center justify-center mb-4 h-16">
          {isAnimating ? (
            <div className="relative w-full flex items-center justify-center">
              {/* Smartphone icon */}
              <div className="absolute animate-in fade-in slide-in-from-left-10 duration-1000">
                <Smartphone 
                  className="w-10 h-10 text-white animate-in zoom-out-50 fade-out duration-1000 delay-1000" 
                  strokeWidth={1.5}
                />
              </div>
              
              {/* Monitor icon - appears after smartphone */}
              <div className="absolute animate-in fade-in slide-in-from-right-10 duration-1000 delay-1500">
                <Monitor 
                  className="w-12 h-12 text-white" 
                  strokeWidth={1.5}
                />
              </div>
            </div>
          ) : (
            <Monitor className="w-12 h-12 text-white" strokeWidth={1.5} />
          )}
        </div>

        {/* Message */}
        <p 
          className="text-center text-sm text-white font-medium leading-relaxed"
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
        >
          This website performs better in computers, we recommend you to switch devices.
        </p>

        {/* Auto-hide indicator */}
        <div className="mt-4 w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
          <div 
            className="h-full rounded-full transition-all"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))',
              animation: 'shrink 10s linear forwards'
            }}
          />
        </div>

        <style>{`
          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
