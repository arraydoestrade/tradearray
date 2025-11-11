import { useEffect, useState, useRef } from 'react';

interface AnimatedStatProps {
  value: string;
  label: string;
}

export default function AnimatedStat({ value, label }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true);
            animateValue();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isAnimating]);

  const animateValue = () => {
    const duration = 2000;
    const frames = 60;
    const frameTime = duration / frames;
    let currentFrame = 0;

    const randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ%<>.-';
    
    const interval = setInterval(() => {
      if (currentFrame < frames) {
        let result = '';
        for (let i = 0; i < value.length; i++) {
          const progress = currentFrame / frames;
          if (Math.random() < progress) {
            result += value[i];
          } else {
            result += randomChars[Math.floor(Math.random() * randomChars.length)];
          }
        }
        setDisplayValue(result);
        currentFrame++;
      } else {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, frameTime);
  };

  return (
    <div ref={elementRef} className="stat-item">
      <span className="stat-number animated">{displayValue || value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
