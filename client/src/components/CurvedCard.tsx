import { useEffect, useRef } from 'react';

interface CurvedCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function CurvedCard({ title, children, className = '' }: CurvedCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // SVG Configuration
    const OFFSET = 7;
    const EXTRA_INSET = 2;
    const MIN_START_RATIO = 0.8;
    const MIN_THUMB = 20;
    const SEGMENTS = 50;

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('curved-scrollbar-svg');
    svg.setAttribute('aria-hidden', 'true');

    const trackPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    trackPath.classList.add('curved-scrollbar-track');

    const thumbPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    thumbPath.classList.add('curved-scrollbar-thumb');

    svg.appendChild(trackPath);
    svg.appendChild(thumbPath);
    container.appendChild(svg);

    let pathLength = 0;
    let thumbLength = 50;
    let dragging = false;
    let pointerId: number | null = null;

    function updatePath() {
      if (!container || !content) return;
      
      const w = container.clientWidth;
      const h = container.clientHeight;
      const style = getComputedStyle(container);
      const r = parseFloat(style.borderRadius) || 0;

      const effectiveRadius = Math.max(r - OFFSET, 0);
      const trackX = w - OFFSET;
      const topY = OFFSET;
      const bottomY = h - OFFSET;
      const cornerX = trackX - effectiveRadius;

      const minStartX = w * MIN_START_RATIO;
      let startX = trackX - effectiveRadius * EXTRA_INSET;
      if (startX < minStartX) startX = minStartX;
      if (startX > cornerX) startX = cornerX;

      const d = `
        M ${startX} ${topY}
        L ${cornerX} ${topY}
        A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${trackX} ${topY + effectiveRadius}
        L ${trackX} ${bottomY - effectiveRadius}
        A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${cornerX} ${bottomY}
        L ${startX} ${bottomY}
      `;
      trackPath.setAttribute('d', d);

      pathLength = trackPath.getTotalLength();
      const ratio = content.clientHeight / content.scrollHeight;
      thumbLength = Math.max(MIN_THUMB, pathLength * ratio);

      updateThumb();
    }

    function updateThumb() {
      if (!content) return;
      
      const scrollableHeight = content.scrollHeight - content.clientHeight || 1;
      const scrollRatio = content.scrollTop / scrollableHeight;
      const startOffset = (pathLength - thumbLength) * scrollRatio;
      const endOffset = startOffset + thumbLength;

      const points = [];
      for (let i = 0; i <= SEGMENTS; i++) {
        const t = startOffset + ((endOffset - startOffset) / SEGMENTS) * i;
        const p = trackPath.getPointAtLength(t);
        points.push(`${p.x} ${p.y}`);
      }

      const segmentD = `M ${points[0]} ${points.slice(1).map(pt => `L ${pt}`).join(' ')}`;
      thumbPath.setAttribute('d', segmentD);
    }

    thumbPath.addEventListener('pointerdown', (e: PointerEvent) => {
      e.preventDefault();
      dragging = true;
      pointerId = e.pointerId;
      thumbPath.setPointerCapture(pointerId);
    });

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId || !container || !content) return;
      const rect = container.getBoundingClientRect();
      let ratio = (e.clientY - rect.top) / rect.height;
      ratio = Math.max(0, Math.min(1, ratio));
      content.scrollTop = ratio * (content.scrollHeight - content.clientHeight);
      updateThumb();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      try {
        thumbPath.releasePointerCapture(pointerId);
      } catch {}
      pointerId = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    content.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updatePath);

    updatePath();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      content.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updatePath);
      svg.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`curved-scroll-container ${className}`}
      data-testid={`curved-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div ref={contentRef} className="curved-scroll-content">
        <h3 className="curved-card-title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
