'use client';

import {useRef, useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';

export function SceneHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Lens Layers
  const layer1Ref = useRef<HTMLDivElement>(null); // Front Glass
  const layer2Ref = useRef<HTMLDivElement>(null); // Outer Ring (Focus)
  const layer3Ref = useRef<HTMLDivElement>(null); // Mid Ring (Zoom)
  const layer4Ref = useRef<HTMLDivElement>(null); // Aperture
  const layer5Ref = useRef<HTMLDivElement>(null); // Sensor/Body

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1500', 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Text Fade Out
      tl.to(textRef.current, {
        opacity: 0,
        scale: 1.2,
        filter: 'blur(10px)',
        duration: 0.2,
      }, 0);

      // Layer 1: Front Glass (Moves fastest, disappears first)
      tl.to(layer1Ref.current, {
        scale: 10,
        opacity: 0,
        rotation: 20,
        duration: 1,
        ease: 'power1.in',
      }, 0);

      // Layer 2: Outer Ring (Focus) - Rotates CW, expands
      tl.to(layer2Ref.current, {
        scale: 8,
        opacity: 0,
        rotation: 90,
        duration: 1.2,
        ease: 'power1.in',
      }, 0.1);

      // Layer 3: Mid Ring (Zoom) - Rotates CCW, expands
      tl.to(layer3Ref.current, {
        scale: 6,
        opacity: 0,
        rotation: -60,
        duration: 1.4,
        ease: 'power1.in',
      }, 0.2);

      // Layer 4: Aperture - Opens and rotates
      tl.to(layer4Ref.current, {
        scale: 5,
        rotation: 180,
        opacity: 0,
        duration: 1.6,
        ease: 'power1.in',
      }, 0.3);

      // Layer 5: Sensor/Body - Anchors the shot, then fades
      tl.to(layer5Ref.current, {
        scale: 3,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.in',
      }, 0.4);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center perspective-[1000px]">
      
      {/* Text Content (Behind the lens initially, but z-index managed) */}
      <div ref={textRef} className="absolute z-50 text-center mix-blend-difference px-4 pointer-events-none">
        <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter text-white mb-4">
          VISIONARY
        </h1>
        <p className="text-sm md:text-xl font-sans tracking-[0.5em] uppercase text-white/80">
          Deconstructed Reality
        </p>
      </div>

      {/* --- LENS ASSEMBLY --- */}
      
      {/* Layer 5: Sensor / Deep Internals */}
      <div ref={layer5Ref} className="absolute z-10 w-[300px] h-[300px] rounded-full flex items-center justify-center">
         <div className="w-full h-full rounded-full bg-zinc-900 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden">
            {/* Sensor reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
            <div className="absolute inset-[20%] border border-zinc-700/50 rounded-sm opacity-50"></div>
            <Image 
             src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
             alt="Camera Sensor"
             fill
             className="object-cover opacity-40 mix-blend-overlay"
           />
         </div>
      </div>

      {/* Layer 4: Aperture Blades */}
      <div ref={layer4Ref} className="absolute z-20 w-[350px] h-[350px] rounded-full flex items-center justify-center">
        <div className="w-full h-full rounded-full border-[20px] border-zinc-800 bg-zinc-950 shadow-2xl flex items-center justify-center overflow-hidden">
           {/* Simulated Aperture */}
           <div className="relative w-full h-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} 
                  className="absolute top-0 left-1/2 w-[150%] h-[150%] bg-zinc-900 border-l border-zinc-700 origin-bottom-left"
                  style={{
                    transform: `translateX(-50%) rotate(${i * 60}deg) skewX(30deg)`,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                ></div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent"></div>
           </div>
        </div>
      </div>

      {/* Layer 3: Mid Ring (Zoom/Mechanics) */}
      <div ref={layer3Ref} className="absolute z-30 w-[420px] h-[420px] rounded-full flex items-center justify-center">
        <div className="w-full h-full rounded-full border-[2px] border-zinc-600 border-dashed opacity-80 shadow-[0_0_30px_rgba(255,255,255,0.05)]"></div>
        <div className="absolute inset-[-10px] rounded-full border border-zinc-800 opacity-50"></div>
        {/* Markings */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono tracking-widest">35mm 50mm 85mm</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono tracking-widest">1:1.4</div>
      </div>

      {/* Layer 2: Outer Ring (Focus) */}
      <div ref={layer2Ref} className="absolute z-40 w-[500px] h-[500px] rounded-full flex items-center justify-center">
         <div className="w-full h-full rounded-full border-[40px] border-zinc-900 shadow-2xl flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-zinc-700/30"></div>
            {/* Grip Texture */}
            <div className="absolute inset-0 rounded-full border-[40px] border-transparent border-t-zinc-800/50 border-b-zinc-800/50 rotate-45"></div>
         </div>
      </div>

      {/* Layer 1: Front Glass (Reflection) */}
      <div ref={layer1Ref} className="absolute z-50 w-[520px] h-[520px] rounded-full flex items-center justify-center pointer-events-none">
         <div className="w-full h-full rounded-full bg-gradient-to-tr from-white/5 via-transparent to-blue-500/10 backdrop-blur-[1px] border border-white/10 shadow-[inset_0_0_50px_rgba(255,255,255,0.1)]">
            <div className="absolute top-[20%] right-[20%] w-20 h-10 bg-white/20 blur-xl rounded-full transform -rotate-45"></div>
         </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 opacity-50 animate-pulse">
        <span className="text-[10px] tracking-[0.3em] uppercase">Disassemble</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black opacity-80 z-0"></div>
    </section>
  );
}
