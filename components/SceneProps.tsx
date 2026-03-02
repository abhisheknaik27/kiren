'use client';

import {useRef, useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';

export function SceneProps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const chairRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Film Reel Parallax
      gsap.to(reelRef.current, {
        y: -200,
        rotation: 360,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Chair Parallax
      gsap.to(chairRef.current, {
        y: -100,
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      });

      // Light Beam
      gsap.to(lightRef.current, {
        opacity: 0.6,
        rotation: -15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-zinc-950 overflow-hidden py-32">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl md:text-8xl font-serif text-white/90 mb-12 max-w-4xl leading-[0.9]">
          Crafting Light <br/> & Shadow
        </h2>
        <p className="text-zinc-400 max-w-md text-lg leading-relaxed ml-auto mr-20">
          Every frame is a painting. Every movement is a word. We build worlds through the lens, capturing the unseen and the unspoken.
        </p>
      </div>

      {/* Props */}
      <div ref={reelRef} className="absolute top-20 right-10 w-64 h-64 opacity-20 pointer-events-none">
         {/* Abstract Film Reel */}
         <div className="w-full h-full border-8 border-zinc-700 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
      </div>

      <div ref={chairRef} className="absolute bottom-20 left-20 w-80 h-96 opacity-0 pointer-events-none grayscale mix-blend-screen">
         <Image 
           src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop"
           alt="Director Chair"
           fill
           className="object-contain"
         />
      </div>

      <div ref={lightRef} className="absolute top-0 left-1/2 w-[2px] h-[150vh] bg-gradient-to-b from-white/20 to-transparent origin-top transform -rotate-45 pointer-events-none blur-sm"></div>
    </section>
  );
}
