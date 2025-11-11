import { useState, useRef, useEffect } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useLocation } from 'wouter';
import BlotterText from '@/components/BlotterText';

export default function Home() {
  const [isCamActive, setIsCamActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { geoData } = useGeolocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      
      // Fade out in the last 0.5 seconds
      if (duration - currentTime <= 0.5) {
        video.style.opacity = String((duration - currentTime) / 0.5);
      }
      // Fade in during the first 0.5 seconds
      else if (currentTime <= 0.5) {
        video.style.opacity = String(currentTime / 0.5);
      }
      // Full opacity in the middle
      else {
        video.style.opacity = '1';
      }
    };

    // Force video to play - CRITICAL for mobile devices
    const forcePlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Retry after a short delay
          setTimeout(() => {
            video.play().catch(() => {
              // Final retry
              setTimeout(() => video.play().catch(() => {}), 500);
            });
          }, 100);
        });
      }
    };

    // Attempt to play immediately
    forcePlay();

    // Retry play every 500ms for the first 3 seconds to ensure it starts
    const playInterval = setInterval(forcePlay, 500);
    setTimeout(() => clearInterval(playInterval), 3000);

    // Force play on any user interaction
    const handleInteraction = () => {
      forcePlay();
    };

    // Force play when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        forcePlay();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(playInterval);
    };
  }, []);

  return (
    <section className="section-container" style={{
      zoom: isMobile ? '0.85' : '1'
    }}>
      <div className="fullscreen-media-container video overlay">
        <video 
          ref={videoRef}
          src="/b1b.mp4" 
          autoPlay 
          playsInline 
          muted 
          loop 
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          controls={false}
          data-testid="video-background"
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            top: 0,
            left: 0,
            zIndex: 0,
            transition: 'opacity 0.1s ease',
            pointerEvents: 'none'
          }}
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            // Remove any controls that might appear
            video.removeAttribute('controls');
            // Force play multiple times
            video.play().catch(() => {
              setTimeout(() => {
                video.play().catch(() => {
                  setTimeout(() => video.play().catch(() => {}), 200);
                });
              }, 100);
            });
          }}
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {});
          }}
          onCanPlay={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {});
          }}
          onClick={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="black-overlay"></div>
        <BlotterText />
        <div className="overlay-content-container">
          <div className="partner-text-container">
            <button className="button-mic-element size-s" data-testid="partner-location-status">
              <span className="icon">
                {geoData && (
                  <img 
                    src={`https://flagcdn.com/w20/${geoData.countryCode}.png`}
                    alt={geoData.country}
                    style={{ width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
              </span>
            </button>
            <span className="name" data-testid="partner-country">{geoData?.country || 'Loading...'}</span>
          </div>
          <div className="ui-container">
            <div className="navigation-controls-container">
              <button 
                className="button-cam-element switch"
                onClick={() => setLocation('/auth')}
                data-testid="button-auth"
              >
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="4.5" r="2.5" stroke="white" strokeWidth="1.5"/>
                    <path d="M2 12.5C2 10.015 4.239 8 7 8C9.761 8 12 10.015 12 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              <button 
                className="button-share-element"
                onClick={() => setLocation('/about')}
                data-testid="button-about"
              >
                <span className="icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 8.29 1.42 9.48 2.14 10.43" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7Z" stroke="white" strokeWidth="1.5"/>
                    <path d="M9 9V7C9 5.34315 10.3431 4 12 4V4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              <div style={{ position: 'relative' }}>
                <button 
                  className="button-settings" 
                  onClick={() => setMenuOpen(!menuOpen)}
                  data-testid="button-settings"
                >
                  <span></span>
                </button>
                {menuOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '60px',
                      right: '0',
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      minWidth: '200px',
                      overflow: 'hidden',
                      zIndex: 1000
                    }}
                    data-testid="settings-menu"
                  >
                    <button
                      onClick={() => {
                        window.location.href = 'mailto:contact@tradearray.org';
                        setMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      data-testid="menu-contact"
                    >
                      Contact Us
                    </button>
                    <button
                      onClick={() => {
                        setLocation('/terms');
                        setMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      data-testid="menu-terms"
                    >
                      Terms & Conditions
                    </button>
                    <button
                      onClick={() => {
                        window.open('http://discord.gg/jm4thHfnCF', '_blank');
                        setMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      data-testid="menu-array-discord"
                    >
                      Array's Discord
                    </button>
                    <button
                      disabled
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        color: 'rgba(255, 255, 255, 0.3)',
                        border: 'none',
                        cursor: 'not-allowed',
                        fontSize: '14px',
                        opacity: 0.5
                      }}
                      data-testid="menu-sponsoring"
                    >
                      Sponsoring
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button 
            className="button-cam-element switch fixed top-4 right-4 md:top-auto md:bottom-4 md:right-4 z-50"
            onClick={() => window.open('http://discord.gg/jm4thHfnCF', '_blank')}
            data-testid="button-discord"
          >
            <span className="icon">
              <svg width="16" height="16" viewBox="0 0 127.14 96.36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
