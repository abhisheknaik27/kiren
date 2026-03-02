'use client';

import {useRef, useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';

const timeline = [
  {
    id: 1,
    year: "1998",
    title: "The Spark",
    description: "It started with a dusty 35mm Nikon found in an attic. The first click of the shutter wasn't just a sound; it was an awakening. I realized the world wasn't just what we see, but how we choose to frame it.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    year: "2010",
    title: "The Craft",
    description: "Film school was the crucible. Sleepless nights in the editing bay, the smell of developing chemicals, and the relentless pursuit of the perfect cut. Here, I learned that technique is nothing without soul.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Breakthrough",
    description: "My first feature, 'Echoes of Silence', premiered at Sundance. It was a raw, unfiltered look at urban isolation. The applause faded, but the hunger to tell deeper, more complex stories only grew.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "The Vision",
    description: "Today, my work is a dialogue between the seen and the unseen. I strive to create visual languages that transcend borders. Every frame is a question, every scene an answer waiting to be discovered.",
    image: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?q=80&w=1000&auto=format&fit=crop"
  }
];

export function SceneAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = filmStripRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      
      // Calculate how far to move the strip
      // We want to move it so the last item is fully visible
      const xMove = -(scrollWidth - windowWidth);

      gsap.to(filmStripRef.current, {
        x: xMove,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${timeline.length * 1000}`, // Adjust scroll length
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect for images inside frames
      const frames = gsap.utils.toArray('.film-frame-image');
      frames.forEach((frame: any) => {
        gsap.to(frame, {
          scale: 1.2,
          scrollTrigger: {
            trigger: frame,
            containerAnimation: gsap.getById("filmScroll"), // Link to horizontal scroll if we named it, but simple scrub works too
            start: "left center",
            end: "right center",
            scrub: true,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-zinc-950 relative">
      <div ref={triggerRef} className="h-screen w-full overflow-hidden flex flex-col justify-center relative">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-black z-0"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 mix-blend-overlay"></div>

        {/* Section Title (Fixed) */}
        <div className="absolute top-10 left-10 z-20">
          <h2 className="text-4xl md:text-6xl font-serif text-white">The Director's Cut</h2>
          <p className="text-zinc-500 font-mono text-sm mt-2 tracking-widest uppercase">A Life in Frames</p>
        </div>

        {/* Film Strip Container */}
        <div ref={filmStripRef} className="flex items-center pl-[10vw] pr-[10vw] gap-[20vw] w-max relative z-10">
          
          {timeline.map((item, index) => (
            <div key={item.id} className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20 w-[80vw] md:w-[60vw]">
              
              {/* The Film Frame */}
              <div className="relative shrink-0">
                {/* Sprocket Holes Top */}
                <div className="absolute -top-8 left-0 right-0 h-6 flex justify-between px-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={`t-${i}`} className="w-4 h-full bg-zinc-900 rounded-sm"></div>
                  ))}
                </div>

                {/* Main Frame */}
                <div className="relative w-[300px] md:w-[500px] aspect-[4/3] bg-black border-y-8 border-zinc-900 overflow-hidden shadow-2xl group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="film-frame-image object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Film Grain Overlay */}
                  <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none"></div>
                  
                  {/* Frame Number */}
                  <div className="absolute bottom-4 right-4 text-yellow-500/50 font-mono text-xs tracking-widest">
                    {item.year} // FRAME {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Sprocket Holes Bottom */}
                <div className="absolute -bottom-8 left-0 right-0 h-6 flex justify-between px-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={`b-${i}`} className="w-4 h-full bg-zinc-900 rounded-sm"></div>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div className="max-w-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl md:text-6xl font-serif text-white/20 font-bold">{item.year}</span>
                  <div className="h-px bg-white/20 flex-1"></div>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">{item.title}</h3>
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

            </div>
          ))}

          {/* End Spacer */}
          <div className="w-[20vw]"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-10 z-20 flex items-center gap-4 text-zinc-500">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll to Play</span>
          <div className="w-12 h-px bg-zinc-800"></div>
        </div>

      </div>
    </section>
  );
}
