import { useEffect, useRef, useState } from 'react';

interface FancyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  cardIndex?: number;
}

export default function FancyCard({ icon, title, description, className = '', cardIndex = 0 }: FancyCardProps) {
  const [isDominoHover, setIsDominoHover] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeout1Ref = useRef<number | null>(null);
  const timeout2Ref = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const delay = 1500 + (cardIndex * 400);
            
            timeout1Ref.current = window.setTimeout(() => {
              setIsDominoHover(true);
              
              timeout2Ref.current = window.setTimeout(() => {
                setIsDominoHover(false);
              }, 600);
            }, delay);
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      
      if (timeout1Ref.current !== null) {
        window.clearTimeout(timeout1Ref.current);
      }
      if (timeout2Ref.current !== null) {
        window.clearTimeout(timeout2Ref.current);
      }
    };
  }, [cardIndex, hasAnimated]);

  return (
    <div 
      ref={cardRef}
      className={`fancy-card ${isDominoHover ? 'domino-hover' : ''} ${className}`} 
      data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span className="fancy-card-icon">
        {icon}
      </span>
      <h4 className="fancy-card-title">{title}</h4>
      <p className="fancy-card-description">{description}</p>
      <div className="fancy-card-shine"></div>
      <div className="fancy-card-background">
        <div className="fancy-card-tiles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`fancy-card-tile fancy-card-tile-${i + 1}`}></div>
          ))}
        </div>
        <div className="fancy-card-line fancy-card-line-1"></div>
        <div className="fancy-card-line fancy-card-line-2"></div>
        <div className="fancy-card-line fancy-card-line-3"></div>
      </div>
    </div>
  );
}
