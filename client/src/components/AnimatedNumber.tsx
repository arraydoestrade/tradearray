import { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  value: string;
}

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumber();
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
  }, [hasAnimated, value]);

  const animateNumber = () => {
    const numericPart = value.match(/\d+/)?.[0];
    if (!numericPart) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericPart);
    const suffix = value.replace(numericPart, '');
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(targetNumber * easeProgress);
        setDisplayValue(currentValue + suffix);
        currentStep++;
      } else {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, stepTime);
  };

  return (
    <span ref={elementRef} className="stat-value">
      {displayValue}
    </span>
  );
}
