'use client';

import {useRef, useLayoutEffect, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {motion, AnimatePresence} from 'motion/react';
import {clsx} from 'clsx';
import {Play, Maximize2, Smartphone, Monitor} from 'lucide-react';

const additionalReels = {
  landscape: [
    { id: 'l1', title: "Cinematic Journey", src: "https://www.youtube.com/embed/LXb3EKWsInQ" }, // Costa Rica 4K
    { id: 'l2', title: "Urban Rhythm", src: "https://www.youtube.com/embed/ysz5S6PUM-U" }, // Tokyo Night
    { id: 'l3', title: "Nature's Breath", src: "https://www.youtube.com/embed/tO01J-M3g0U" }, // Nature
    { id: 'l4', title: "Deep Blue", src: "https://www.youtube.com/embed/qCZdC0s_59k" }, // Ocean
  ],
  portrait: [
    { id: 'p1', title: "Fashion Week", src: "https://www.youtube.com/embed/2Gg6Seob5Mg" }, // Fashion
    { id: 'p2', title: "Street Style", src: "https://www.youtube.com/embed/77Zt7R9X_Cg" }, // Street
    { id: 'p3', title: "Behind The Scenes", src: "https://www.youtube.com/embed/ShortID3" }, // Placeholder
    { id: 'p4', title: "Mood Piece", src: "https://www.youtube.com/embed/ShortID4" }, // Placeholder
  ]
};

export function SceneReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate the main video entrance if not expanded
      if (!isExpanded) {
        gsap.fromTo(videoRef.current, 
          {
            clipPath: 'inset(20% 20% 20% 20%)',
            scale: 0.8,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isExpanded]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center py-20 overflow-hidden">
      
      {/* Main Showreel Container */}
      <div 
        ref={videoRef} 
        className={clsx(
          "relative bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out",
          isExpanded ? "w-full h-[40vh] md:h-[50vh] mb-10" : "w-[90%] md:w-[80%] aspect-video"
        )}
      >
        {/* Main Video Embed (Autoplay, Muted, Loop) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           <iframe 
             width="100%" 
             height="100%" 
             src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&controls=0&loop=1&playlist=LXb3EKWsInQ&playsinline=1" 
             title="Main Showreel" 
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             className="w-full h-full object-cover scale-150" // Scale to remove black bars/controls
           ></iframe>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="absolute bottom-10 left-6 md:left-10 z-10 pointer-events-none">
           <h2 className="text-4xl md:text-7xl font-serif text-white mb-2">
             Showreel 2025
           </h2>
           <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
             Cinematography & Direction
           </p>
        </div>
      </div>

      {/* View More / Controls Area */}
      <div className="w-full max-w-7xl px-6 flex flex-col items-center z-20">
        
        {!isExpanded ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsExpanded(true)}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
          >
            <span className="text-white font-mono text-sm tracking-widest uppercase">View Archive</span>
            <Maximize2 size={16} className="text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            {/* Controls */}
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
              <h3 className="text-2xl font-serif text-white">Selected Works</h3>
              
              <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-full border border-white/10">
                <button 
                  onClick={() => setOrientation('landscape')}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase transition-all",
                    orientation === 'landscape' ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                  )}
                >
                  <Monitor size={14} />
                  16:9
                </button>
                <button 
                  onClick={() => setOrientation('portrait')}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase transition-all",
                    orientation === 'portrait' ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                  )}
                >
                  <Smartphone size={14} />
                  9:16
                </button>
              </div>
            </div>

            {/* Grid */}
            <motion.div 
              layout
              className={clsx(
                "grid gap-6",
                orientation === 'landscape' 
                  ? "grid-cols-1 md:grid-cols-2" 
                  : "grid-cols-2 md:grid-cols-4"
              )}
            >
              <AnimatePresence mode='popLayout'>
                {additionalReels[orientation].map((reel) => (
                  <motion.div
                    key={reel.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={clsx(
                      "relative bg-zinc-900 rounded-xl overflow-hidden group cursor-pointer border border-white/5",
                      orientation === 'landscape' ? "aspect-video" : "aspect-[9/16]"
                    )}
                  >
                    {/* Placeholder for video thumbnail/preview */}
                    <div className="absolute inset-0 bg-zinc-800">
                      {/* In a real app, use actual thumbnails. Using a gradient placeholder here. */}
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50"></div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <Play size={20} className="text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <h4 className="text-white font-serif text-lg">{reel.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Close Button */}
            <div className="flex justify-center mt-12">
               <button 
                 onClick={() => setIsExpanded(false)}
                 className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
               >
                 Close Archive
               </button>
            </div>

          </motion.div>
        )}
      </div>

    </section>
  );
}
