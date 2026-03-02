'use client';

import {useEffect, useState, useRef} from 'react';
import {gsap} from 'gsap';

export function Preloader() {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const tl = gsap.timeline();
      
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [count]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center text-white">
      <div ref={textRef} className="text-center">
        <div className="text-9xl font-serif font-bold mb-4 tabular-nums">
          {count}%
        </div>
        <div className="text-xs tracking-[0.5em] uppercase text-zinc-500">
          Initializing Cinema Engine
        </div>
      </div>
    </div>
  );
}
