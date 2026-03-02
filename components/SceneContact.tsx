'use client';

import {useRef, useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function SceneContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Spotlight reveal
      gsap.fromTo(spotlightRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );

      // Form reveal
      gsap.fromTo(formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Spotlight */}
      <div ref={spotlightRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-4">Let's Create</h2>
        <p className="text-zinc-500 mb-12 tracking-widest uppercase text-sm">Start the conversation</p>

        <form ref={formRef} className="space-y-8 text-left">
          <div className="group relative">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
            />
          </div>
          <div className="group relative">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
            />
          </div>
          <div className="group relative">
            <textarea 
              placeholder="Project Details" 
              rows={4}
              className="w-full bg-transparent border-b border-zinc-800 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 resize-none"
            />
          </div>
          
          <div className="pt-8 text-center">
            <button type="button" className="px-12 py-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest uppercase text-xs">
              Send Message
            </button>
          </div>
        </form>
      </div>
      
      <footer className="absolute bottom-10 w-full text-center text-zinc-800 text-xs tracking-widest uppercase">
        © 2025 Cinematic Lens. All Rights Reserved.
      </footer>
    </section>
  );
}
