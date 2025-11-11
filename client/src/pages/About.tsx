import ScrollReveal from '@/components/ScrollReveal';
import FancyCard from '@/components/FancyCard';
import CurvedCard from '@/components/CurvedCard';
import MouseGradient from '@/components/MouseGradient';
import GetStartedButton from '@/components/GetStartedButton';
import AnimatedNumber from '@/components/AnimatedNumber';
import AnimatedCircles from '@/components/AnimatedCircles';

export default function About() {
  return (
    <div className="about-page" data-testid="about-page">
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
      
      <section className="about-hero">
        <ScrollReveal variant="fadeScale" delay={0} duration={1200}>
          <h1 className="about-hero-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
            Revolutionizing <span className="gradient-text">Trading</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={300} duration={1000}>
          <p className="about-hero-subtitle" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
            We are developing an actual platform that connect traders<br />
            professionally and without noise
          </p>
        </ScrollReveal>
      </section>

      <section className="about-compact-features-section">
        <ScrollReveal variant="fadeScale" delay={0} duration={1000}>
          <AnimatedCircles />
        </ScrollReveal>

        <div className="compact-features-grid">
          <ScrollReveal variant="fadeUp" delay={100} duration={1000}>
            <div className="compact-feature-card">
              <div className="compact-feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="compact-feature-title">Professional Insights</h3>
              <p className="compact-feature-text">
                We'll design an space for serious traders seeking to eliminate noise with empowered facilities.
              </p>
              <div className="compact-feature-stat">
                <AnimatedNumber value="100+" />
                <span className="stat-label">Information Filters</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={200} duration={1000}>
            <div className="compact-feature-card">
              <div className="compact-feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="compact-feature-title">Powerful Environment</h3>
              <p className="compact-feature-text">
                Our platform is planned to have one of the highest connectivity perfomance in the industry.
              </p>
              <div className="compact-feature-stat">
                <span className="stat-value">+<AnimatedNumber value="20" /></span>
                <span className="stat-label"> IV Data centers</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={300} duration={1000}>
            <div className="compact-feature-card">
              <div className="compact-feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="3" />
                </svg>
              </div>
              <h3 className="compact-feature-title">Encrypted Data</h3>
              <p className="compact-feature-text">
                Whatever you do in this trading space is secured and fully private, unless you decide to show.
              </p>
              <div className="compact-feature-stat">
                <AnimatedNumber value="100%" /><span className="stat-value"></span>
                <span className="stat-label">Safe Place</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-cards-section">
        <ScrollReveal variant="fadeScale" delay={0} duration={1000}>
          <div className="section-header">
            <span className="about-label">Our Values</span>
            <h2 className="about-cards-title">
              What <span className="gradient-text">defines us</span>
            </h2>
          </div>
        </ScrollReveal>
        
        <div className="about-cards-grid">
          <ScrollReveal variant="fadeUp" delay={0} duration={1000}>
            <FancyCard
              cardIndex={0}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              }
              title="Professionalism"
              description="Developing something for traders who value excellence and reject noise."
            />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={150} duration={1000}>
            <FancyCard
              cardIndex={1}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              }
              title="Focus"
              description="No fake media distractions. Only professional insights and providers."
            />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={300} duration={1000}>
            <FancyCard
              cardIndex={2}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              }
              title="Speed"
              description="Optimized space for high-end updates and connection between users."
            />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0} duration={1000}>
            <FancyCard
              cardIndex={3}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              title="Privacy"
              description="Whatever you use & whatever you do its private, unless you want to show it. Institutional-level securities."
            />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={150} duration={1000}>
            <FancyCard
              cardIndex={4}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Valuable Community"
              description="Connect with professional traders who share your mindset, discipline, and consistency around the world."
            />
          </ScrollReveal>

        </div>
      </section>

      <section className="about-curved-section">
        <ScrollReveal variant="fadeScale" delay={0} duration={1000}>
          <div className="section-header">
            <span className="about-label">Technology</span>
            <h2 className="about-cards-title">
              Built with <span className="gradient-text">excellence</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="curved-cards-grid">
          <ScrollReveal variant="fadeRight" delay={100} duration={1200}>
            <CurvedCard title="High-end Infrastructure">
              <p>Our distributed centerfield will ensure high-end responses in this space. Each data center is optimized to deliver maximum performance.</p>
              <p>With advanced DY processing, and 10 databases hosted by azure, everything always take the most optimal route. We use edge tech to reduce the distance between users and us.</p>
              <p>The infrastructure is designed to scale automatically based on demand, ensuring you never experience service degradation, no matter how many users are simultaneously using the platform here and there.</p>
              <p>Our redundancy system guarantees that even if a data center fails, you are automatically redirected without you noticing any interruption.</p>
              <div className="tech-badge-group">
                <span className="tech-badge">Edge Computing</span>
                <span className="tech-badge">Global CDN</span>
                <span className="tech-badge">Simultaneadles</span>
              </div>
            </CurvedCard>
          </ScrollReveal>

          <ScrollReveal variant="fadeRight" delay={200} duration={1200}>
            <CurvedCard title="Unique Insights">
              <p>What's coming has not even sense, we are working into a game changer for trading & investing communities around the world</p>
              <p>Everything you could've ever hoped for will be at the palm of your hands, you wont need to go anywhere else, this will be now your trading hub</p>
              <p>Multiple collaborations and implementations to come, making this a powerful environment for you and whoever you bring to this space.</p>
              <p>You can be 100% sure that even if the wait is long, It's gonna worth it. No one has ever thought about this before, and We're pretty sure they wouldn't be able to achieve it neither.</p>
              <div className="tech-badge-group">
                <span className="tech-badge">Comfort</span>
                <span className="tech-badge">Fullness</span>
                <span className="tech-badge">Simplicity</span>
              </div>
            </CurvedCard>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeLeft" delay={100} duration={1200}>
            <CurvedCard title="Recognized Directives">
              <p>Since we focus into providing the best experience to everyone, our team is selected by a very strict normative list, which ensures the best and fastest support service that could be received</p>
              <p>We'll work actively to protect your online integrity among our platforms and provide solutions to either slight or severe complications in a matter of hours.</p>
              <p>We use automated moderation to prevent and anticipate potential issues, proactively adjusting quality before you notice any of them.</p>
              <p>Feel free to navigate into everything we'll have for you.</p>
              <div className="tech-badge-group">
                <span className="tech-badge">Certified Support</span>
                <span className="tech-badge">Profitable Directives</span>
                <span className="tech-badge">Automated security</span>
              </div>
            </CurvedCard>
          </ScrollReveal>

        </div>
      </section>

      <section className="about-section about-section-center">
        <div className="about-content-wrapper">
          <ScrollReveal variant="fadeScale" delay={100} duration={1400}>
            <div className="about-content-block-center" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '420px'
            }}>
              <h2 className="about-section-title-center" style={{
                margin: 0
              }}>
                We're just <span className="gradient-text">getting started</span>
              </h2>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-cta">
        <ScrollReveal variant="fadeScale" delay={0} duration={1000}>
          <div className="cta-content">
            <h2 className="about-cta-title">Ready to experience something new?</h2>
            <p className="about-cta-subtitle">Join the wait today and enjoy later</p>
            <GetStartedButton />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
