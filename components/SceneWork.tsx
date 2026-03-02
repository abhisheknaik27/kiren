'use client';

import {useRef, useLayoutEffect, useState, useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {clsx} from 'clsx';
import {motion, AnimatePresence} from 'motion/react';
import {X} from 'lucide-react';

const works = [
  {
    id: 1,
    title: "Midnight Tokyo",
    category: "Commercial",
    year: "2024",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
    color: "from-blue-900/40 to-purple-900/40",
    description: "A neon-soaked journey through the sleepless streets of Shinjuku. We captured the vibrant energy of Tokyo's nightlife, focusing on the interplay between artificial light and urban solitude.",
    gallery: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Desert Echoes",
    category: "Narrative",
    year: "2023",
    image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1000&auto=format&fit=crop",
    color: "from-orange-900/40 to-red-900/40",
    description: "Shot in the vast emptiness of the Mojave, this narrative piece explores themes of isolation and resilience. The harsh sunlight and deep shadows became characters in themselves.",
    gallery: [
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Silent Void",
    category: "Experimental",
    year: "2023",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop",
    color: "from-zinc-900/40 to-black/40",
    description: "An abstract exploration of form and texture. Using macro cinematography and practical effects, we created a world that feels both organic and alien.",
    gallery: [
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Neon Rain",
    category: "Music Video",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    color: "from-cyan-900/40 to-blue-900/40",
    description: "A cyberpunk-inspired music video featuring heavy rain effects and dynamic lighting. The goal was to create a feeling of melancholy amidst a futuristic backdrop.",
    gallery: [
      "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=800&auto=format&fit=crop"
    ]
  }
];

export function SceneWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${works.length * 1000}`, // Reduced distance for quicker scroll
        pin: true,
        scrub: 0.5, // Reduced scrub for less lag/more responsiveness
        onUpdate: (self) => {
          // Calculate active index based on scroll progress
          const index = Math.min(
            Math.floor(self.progress * works.length),
            works.length - 1
          );
          setActiveIndex(index);
        }
      });

      // Animate cards
      works.forEach((_, i) => {
        const card = cardsRef.current[i];
        if (!card) return;

        // Initial state
        gsap.set(card, {
          zIndex: works.length - i,
          scale: 1 - (i * 0.05), // Stack effect
          y: i * 20, // Vertical offset
          opacity: 1 - (i * 0.2), // Fade out back cards
          filter: `blur(${i * 2}px)`, // Blur back cards
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Update card positions when active index changes
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      works.forEach((_, i) => {
        const card = cardsRef.current[i];
        if (!card) return;

        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        const isNext = i > activeIndex;
        const dist = i - activeIndex;

        if (isActive) {
          gsap.to(card, {
            scale: 1,
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            zIndex: 10,
            duration: 0.6, // Faster duration
            ease: "power2.out" // Slightly snappier ease
          });
        } else if (isPast) {
          gsap.to(card, {
            scale: 1.2,
            y: -1000, // Fly up and out
            opacity: 0,
            zIndex: 10,
            duration: 0.6,
            ease: "power2.in"
          });
        } else if (isNext) {
          gsap.to(card, {
            scale: 1 - (dist * 0.05),
            y: dist * 40,
            opacity: Math.max(0, 1 - (dist * 0.3)),
            filter: `blur(${dist * 5}px)`,
            zIndex: 10 - dist,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedWork]);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
      {/* Background Dynamic Color */}
      <div className="absolute inset-0 transition-colors duration-1000 ease-in-out">
        <div className={clsx(
          "absolute inset-0 bg-gradient-to-br opacity-30 transition-all duration-1000",
          works[activeIndex].color
        )}></div>
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-white"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
      </div>

      <div className="relative w-full max-w-7xl px-6 h-full flex flex-col justify-center gap-12 md:gap-20 py-10">
        {/* Header - Now relative with gap */}
        <div className="relative z-20 md:pl-20 flex flex-col justify-end">
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-4">Selected Work</h2>
          <div className="flex items-center gap-4 text-zinc-500 font-mono text-sm">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <div className="w-20 h-px bg-zinc-800 relative overflow-hidden">
               <div 
                 className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
                 style={{ width: `${((activeIndex + 1) / works.length) * 100}%` }}
               ></div>
            </div>
            <span>{String(works.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Stacked Cards Container - Flexible height */}
        <div className="relative w-full flex-1 flex items-center justify-center perspective-[1000px]">
          {works.map((work, i) => (
            <div
              key={work.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute w-[85vw] md:w-[60vw] aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-2xl origin-bottom"
              onClick={() => i === activeIndex && setSelectedWork(work)}
            >
              {/* Image */}
              <div className={clsx(
                "relative w-full h-full group transition-all duration-500",
                i === activeIndex ? "cursor-pointer" : "pointer-events-none"
              )}>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest backdrop-blur-md">
                      {work.category}
                    </span>
                    <span className="font-mono text-xs text-white/60">{work.year}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-4xl md:text-7xl font-serif text-white mb-2 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {work.title}
                    </h3>
                    <div className="w-0 group-hover:w-full h-px bg-white transition-all duration-700 ease-out"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white hover:text-black rounded-full transition-colors duration-300 backdrop-blur-md"
              >
                <X size={24} />
              </button>

              {/* Left: Main Visual */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full relative">
                <Image
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
                
                <div className="absolute bottom-8 left-8 z-10">
                  <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest backdrop-blur-md mb-4 inline-block">
                    {selectedWork.category}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif text-white leading-none">
                    {selectedWork.title}
                  </h2>
                </div>
              </div>

              {/* Right: Content */}
              <div 
                className="w-full md:w-1/2 h-full overflow-y-auto p-8 md:p-12 bg-zinc-900"
                data-lenis-prevent
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-zinc-400 font-mono text-sm">Year</span>
                    <span className="text-white font-mono">{selectedWork.year}</span>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-zinc-300 leading-relaxed font-light">
                      {selectedWork.description}
                    </p>
                  </div>

                  {/* Gallery Grid */}
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-zinc-500 font-mono">Gallery</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedWork.gallery.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-800">
                          <Image
                            src={img}
                            alt={`Gallery ${idx}`}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Placeholder */}
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-zinc-500 font-mono">Film</h4>
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer">
                      <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
