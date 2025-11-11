import { useEffect, useRef } from 'react';

export default function MouseGradient() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gradientRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        
        gradientRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(30, 58, 138, 0.15), transparent 40%)`;
        gradientRef.current.style.transition = 'none';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={gradientRef} className="mouse-gradient" />;
}
