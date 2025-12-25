"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// Placeholder data - User needs to add real images to /public/memories/
// This array holds all the special moments. You can add as many as you want!
// ideally around 10-12 works best for this specific 3D wheel effect.
const MEMORIES = [
  { id: 1, src: "/memories/placeholder.png", caption: "Our First Christmas" },
  { id: 2, src: "/memories/placeholder.png", caption: "Coffee Dates" },
  { id: 3, src: "/memories/placeholder.png", caption: "That Road Trip" },
  { id: 4, src: "/memories/placeholder.png", caption: "Silly Moments" },
  { id: 5, src: "/memories/placeholder.png", caption: "Movie Night" },
  { id: 6, src: "/memories/placeholder.png", caption: "Sunset Kiss" },
  { id: 7, src: "/memories/placeholder.png", caption: "New Year's Eve" },
  { id: 8, src: "/memories/placeholder.png", caption: "Cooking Together" },
  { id: 9, src: "/memories/placeholder.png", caption: "More Adventures" },
  { id: 10, src: "/memories/placeholder.png", caption: "Forever & Always" },
];

export default function MemoriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire page container
  // We use this value to drive the rotation of the wheel.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll so the wheel feels heavy and luxurious, not jittery.
  // 'stiffness' and 'damping' control the physics of the smoothing.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map the scroll progress (0 to 1) to rotation degrees.
  // We rotate it twice (-720 deg) over the full scroll length to show all photos.
  const rotateX = useTransform(smoothProgress, [0, 1], [0, -360 * 2]);
  
  // Perspective value creates the 3D depth effect.
  // A larger number means items don't distort as much.
  const distance = 800; // Radius of the wheel - how far out the photos sit.

  return (
    // The container is very tall (500vh) to give us plenty of room to scroll
    <div ref={containerRef} className="bg-christmas-dark min-h-[500vh] relative perspective-2000 overflow-hidden">
        {/* Fixed Viewport: The wheel itself stays fixed in the center while we scroll */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none perspective-container">
            
            <motion.div 
                className="relative w-[300px] h-[400px] md:w-[500px] md:h-[600px] preserve-3d"
                style={{ rotateX }}
            >
                {MEMORIES.map((memory, index) => {
                    // Calculate the angle for each photo so they are evenly spaced around the circle.
                    const count = MEMORIES.length;
                    const angle = (360 / count) * index;
                    
                    // We render each photo panel here.
                    // 'rotateX' positions it around the ring.
                    // 'translateZ' pushes it out from the center to create the wheel radius.
                    return (
                        <div 
                            key={memory.id}
                            className="absolute inset-0 flex items-center justify-center backface-visible"
                            style={{
                                transform: `rotateX(${angle}deg) translateZ(${distance}px)`,
                            }}
                        >
                            <div className="relative w-full h-full p-4 bg-white/5 border-2 border-christmas-gold/30 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm group hover:border-christmas-gold transition-colors duration-500">
                                <Image
                                    src={memory.src}
                                    alt={memory.caption}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4 text-center">
                                    <p className="text-christmas-gold font-serif text-xl italic">{memory.caption}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        
        </div>

        {/* Helper text to tell the user what to do */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center z-50 animate-bounce">
            <p className="text-white/50 text-sm font-serif">Scroll to explore memories...</p>
        </div>

        {/* Global styles injected just for this page's 3D needs */}
        <style jsx global>{`
            .perspective-container {
                perspective: 2000px;
            }
            .preserve-3d {
                transform-style: preserve-3d;
            }
            .backface-visible {
                backface-visibility: visible;
                /* Visible so we can see them coming back up from the bottom */
            }
        `}</style>
    </div>
  );
}
