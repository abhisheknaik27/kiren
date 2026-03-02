'use client';

import {useRef, useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';

const photos = [
  "https://images.unsplash.com/photo-1533158388470-9a56699990c6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550100136-e074fa43d818?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop",
];

export function SceneGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;
      
      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger after a short delay to ensure layout is stable
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden flex items-center">
      <div ref={trackRef} className="flex gap-10 md:gap-20 px-10 md:px-20 items-center">
        <div className="flex-shrink-0 w-[80vw] md:w-[40vw] text-white">
           <h2 className="text-6xl md:text-8xl font-serif mb-6">Stills</h2>
           <p className="text-zinc-400 max-w-md text-sm md:text-base">Moments frozen in time. A collection of light, shadow, and emotion.</p>
        </div>
        {photos.map((src, i) => (
          <div key={i} className="flex-shrink-0 relative w-[70vw] md:w-[30vw] aspect-[3/4] group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out">
            <Image 
              src={src}
              alt={`Gallery ${i}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        ))}
        <div className="flex-shrink-0 w-[10vw] md:w-[20vw]"></div>
      </div>
    </section>
  );
}
