import ScrollReveal from '@/components/ScrollReveal';
import MouseGradient from '@/components/MouseGradient';
import { useLocation } from 'wouter';

export default function Terms() {
  const [, setLocation] = useLocation();

  return (
    <div className="terms-page about-page" data-testid="terms-page">
      <div className="about-page-background">
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
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="about-background-video"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
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
        <div className="about-black-overlay"></div>
      </div>
      <MouseGradient />
      
      <section className="about-hero" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <ScrollReveal variant="fadeScale" delay={0} duration={1200}>
          <h1 className="about-hero-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', marginBottom: '16px' }}>
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={200} duration={1000}>
          <p className="about-hero-subtitle" style={{ 
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            opacity: 0.7,
            fontWeight: '300',
            letterSpacing: '0.05em'
          }}>
            Effective as of November 11, 2025
          </p>
        </ScrollReveal>
      </section>

      <section className="terms-content-section" style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px clamp(20px, 5vw, 60px) 80px',
        position: 'relative',
        zIndex: 1
      }}>
        
        <ScrollReveal variant="fadeUp" delay={100} duration={1000}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
            backdropFilter: 'blur(30px) saturate(150%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 'clamp(32px, 6vw, 56px)',
            marginBottom: '28px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15))',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(147, 197, 253, 0.9)' }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.65rem, 3.2vw, 2.25rem)',
                fontWeight: '300',
                color: 'white',
                margin: 0,
                letterSpacing: '0.02em'
              }}>
                Welcome to Array
              </h2>
            </div>
            
            <p style={{
              fontSize: 'clamp(1rem, 1.9vw, 1.125rem)',
              lineHeight: '1.85',
              color: 'rgba(255, 255, 255, 0.75)',
              marginBottom: '18px',
              fontWeight: '300',
              letterSpacing: '0.01em'
            }}>
              Array is currently in development. By accessing our platform, you acknowledge that we are building a professional trading environment designed to connect serious traders worldwide.
            </p>
            <p style={{
              fontSize: 'clamp(1rem, 1.9vw, 1.125rem)',
              lineHeight: '1.85',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: 0,
              fontWeight: '300',
              letterSpacing: '0.01em'
            }}>
              These terms and conditions govern your use of our services and set forth the agreement between you and Array.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '24px', marginBottom: '28px' }}>
          <ScrollReveal variant="fadeUp" delay={200} duration={1000}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
              backdropFilter: 'blur(30px) saturate(150%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: 'clamp(28px, 5vw, 48px)',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
              }}></div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(147, 197, 253, 0.9)' }}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.85rem)',
                  fontWeight: '300',
                  color: 'white',
                  margin: 0,
                  letterSpacing: '0.02em'
                }}>
                  Platform Status
                </h2>
              </div>
              
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '16px',
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                Our platform is under active development. Features, services, and functionalities may change without prior notice as we refine and enhance the user experience.
              </p>
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                Early access users understand and accept that the platform is evolving, and certain features described may not yet be fully implemented.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={300} duration={1000}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
              backdropFilter: 'blur(30px) saturate(150%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: 'clamp(28px, 5vw, 48px)',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
              }}></div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(147, 197, 253, 0.9)' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.85rem)',
                  fontWeight: '300',
                  color: 'white',
                  margin: 0,
                  letterSpacing: '0.02em'
                }}>
                  User Responsibilities
                </h2>
              </div>
              
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '16px',
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                By using Array, you agree to conduct yourself professionally and respectfully. Our platform is designed for serious traders who value quality interactions and meaningful connections.
              </p>
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                Users are responsible for maintaining the confidentiality of their account credentials and for all activities conducted under their account.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '24px', marginBottom: '28px' }}>
          <ScrollReveal variant="fadeUp" delay={400} duration={1000}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
              backdropFilter: 'blur(30px) saturate(150%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: 'clamp(28px, 5vw, 48px)',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
              }}></div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(147, 197, 253, 0.9)' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.85rem)',
                  fontWeight: '300',
                  color: 'white',
                  margin: 0,
                  letterSpacing: '0.02em'
                }}>
                  Privacy & Security
                </h2>
              </div>
              
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '16px',
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                We are committed to protecting your privacy. All data transmitted through our platform is encrypted and secured using industry-standard protocols.
              </p>
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                Your trading activities and personal information remain confidential unless you explicitly choose to share them with other users.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={500} duration={1000}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
              backdropFilter: 'blur(30px) saturate(150%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: 'clamp(28px, 5vw, 48px)',
              height: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
              }}></div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(147, 197, 253, 0.9)' }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.85rem)',
                  fontWeight: '300',
                  color: 'white',
                  margin: 0,
                  letterSpacing: '0.02em'
                }}>
                  Limitation of Liability
                </h2>
              </div>
              
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '16px',
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                Array provides a platform for professional traders to connect and utilize tools & insights. We do not provide financial advice, but certified agents might do, and users are solely responsible for their trading decisions.
              </p>
              <p style={{
                fontSize: 'clamp(0.975rem, 1.85vw, 1.075rem)',
                lineHeight: '1.85',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                fontWeight: '300',
                letterSpacing: '0.01em'
              }}>
                The platform is provided "as is" during development, and we make no warranties regarding availability, accuracy, or completeness of services.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fadeUp" delay={600} duration={1000}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
            backdropFilter: 'blur(30px) saturate(150%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 'clamp(32px, 6vw, 56px)',
            marginBottom: '48px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15))',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(147, 197, 253, 0.9)' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.65rem, 3.2vw, 2.25rem)',
                fontWeight: '300',
                color: 'white',
                margin: 0,
                letterSpacing: '0.02em'
              }}>
                Contact
              </h2>
            </div>
            
            <p style={{
              fontSize: 'clamp(1rem, 1.9vw, 1.125rem)',
              lineHeight: '1.85',
              color: 'rgba(255, 255, 255, 0.75)',
              marginBottom: '18px',
              fontWeight: '300',
              letterSpacing: '0.01em'
            }}>
              For questions regarding these terms and conditions, please contact us at{' '}
              <a 
                href="mailto:contact@tradearray.org"
                style={{
                  color: 'rgba(147, 197, 253, 1)',
                  textDecoration: 'none',
                  fontWeight: '400',
                  borderBottom: '1px solid rgba(147, 197, 253, 0.3)',
                  transition: 'all 0.2s',
                  paddingBottom: '1px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(147, 197, 253, 0.8)';
                  e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(147, 197, 253, 0.3)';
                  e.currentTarget.style.color = 'rgba(147, 197, 253, 1)';
                }}
              >
                contact@tradearray.org
              </a>
            </p>
            <p style={{
              fontSize: 'clamp(0.925rem, 1.75vw, 1.025rem)',
              lineHeight: '1.85',
              color: 'rgba(255, 255, 255, 0.55)',
              margin: 0,
              fontWeight: '300',
              fontStyle: 'italic'
            }}>
              These terms may be updated as our platform evolves. Continued use of Array constitutes acceptance of any modifications.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeScale" delay={700} duration={1000}>
          <div style={{ 
            textAlign: 'center', 
            paddingTop: '32px',
            paddingBottom: '20px'
          }}>
            <button
              onClick={() => setLocation('/')}
              style={{
                padding: '16px 48px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(30, 64, 175, 0.2) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                color: 'white',
                fontSize: 'clamp(0.95rem, 1.75vw, 1.05rem)',
                fontWeight: '300',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(30, 64, 175, 0.3) 100%)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(30, 64, 175, 0.2) 100%)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
              data-testid="button-back-home"
            >
              Back to Home
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
