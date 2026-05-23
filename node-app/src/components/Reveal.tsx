import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.disconnect();
      }
    }, { threshold: 0, rootMargin: '0px 0px 120px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
