import { useEffect, useRef, useState } from 'react';

type RevealVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeScale' | 'fadeRotate';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
}

export default function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  variant = 'fadeUp',
  duration = 1200
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        } else {
          // Reverse animation when scrolling back up
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`scroll-reveal scroll-reveal-${variant} ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
}
