"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// Placeholder data - User needs to add real images to /public/memories/
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
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll for the rotation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 360 degrees for full scroll * 2 rotations maybe?
  const rotateX = useTransform(smoothProgress, [0, 1], [0, -360 * 2]);
  
  // Perspective value for 3D effect
  const distance = 800; // Radius of the wheel

  return (
    <div ref={containerRef} className="bg-christmas-dark min-h-[500vh] relative perspective-2000 overflow-hidden">
        {/* Fixed Viewport for the Wheel */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none perspective-container">
            
            <motion.div 
                className="relative w-[300px] h-[400px] md:w-[500px] md:h-[600px] preserve-3d"
                style={{ rotateX }}
            >
                {MEMORIES.map((memory, index) => {
                    const count = MEMORIES.length;
                    const angle = (360 / count) * index;
                    const rad = (angle * Math.PI) / 180;
                    
                    // Standard cylindrical arrangement
                    // y moves to different height? NO, for water wheel they are ringed.
                    // But user wants "images fall towards you".
                    // The rotation X will bring them from background to foreground.
                    
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

        {/* Scroll Prompt */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center z-50 animate-bounce">
            <p className="text-white/50 text-sm font-serif">Scroll to explore memories...</p>
        </div>

        {/* Global styles for 3D specifically here if not in global css */}
        <style jsx global>{`
            .perspective-container {
                perspective: 2000px;
            }
            .preserve-3d {
                transform-style: preserve-3d;
            }
            .backface-visible {
                backface-visibility: visible;
                /* Or hidden if we want them to disappear when behind */
            }
        `}</style>
    </div>
  );
}
