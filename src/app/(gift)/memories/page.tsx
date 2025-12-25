"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { Lock, EyeOff, Maximize2, Minimize2, Play, Pause, X } from "lucide-react";

// Placeholder data - User needs to add real images to /public/memories/
interface Memory {
  id: number;
  type: 'image' | 'video';
  src: string;
  caption: string;
}

const MEMORIES: Memory[] = [
  { id: 1, type: 'video', src: "/memories/Video 1 Sleepy Head.mp4", caption: "High School Days" },
  { id: 2, type: 'video', src: "/memories/Video 8 Sleepy Head.mp4", caption: "Sleep as usual" },
  { id: 3, type: 'video', src: "/memories/video-3-love-overdose.mp4", caption: "Fun Times" },
  { id: 4, type: 'image', src: "/memories/First School Trip.jpeg", caption: "First School Trip" },
  { id: 5, type: 'image', src: "/memories/First School Trip 2.jpeg", caption: "First School Trip Part 2" },
  { id: 6, type: 'image', src: "/memories/family outing.jpeg", caption: "Family outing" },
  { id: 7, type: 'image', src: "/memories/glowing.jpeg", caption: "Glowing" },
  { id: 8, type: 'image', src: "/memories/Pool cam.jpeg", caption: "Pool cam" },
  { id: 9, type: 'image', src: "/memories/Pool cam 2.jpeg", caption: "Pool cam Part 2" },
  { id: 10, type: 'image', src: "/memories/Birthday barb.jpeg", caption: "Forever & Always" },
  { id: 11, type: 'image', src: "/memories/bae-bday.jpeg", caption: "To many many more" },
  { id: 12, type: 'image', src: "/memories/forehead kiss for bae.jpeg", caption: "Kisses" },
  { id: 13, type: 'image', src: "/memories/beautiful just because.jpeg", caption: "Beautiful" },
];

// SECRET: Only for her eyes! 
const HIDDEN_MEMORIES: Memory[] = [
  { id: 101, type: 'image', src: "/memories/Secret BBB in my shirt.jpeg", caption: "My Eyes Only: 1" },
  { id: 102, type: 'video', src: "/memories/Secret Video 1 Pool Kiss cam .mp4", caption: "Secret Video 🤫" }, 
  { id: 103, type: 'image', src: "/memories/embarass me self .jpeg", caption: "jah jah" },
  { id: 104, type: 'image', src: "/memories/Secret no face no trace.jpeg", caption: "My Eyes Only: 4" },
  { id: 105, type: 'image', src: "/memories/secret as a engineer wifey.jpeg", caption: "Engineering wifey" },
  { id: 106, type: 'image', src: "/memories/Secret First Sleepover.jpeg", caption: "First Sleepover" },
  { id: 107, type: 'video', src: "/memories/secret goofy.mp4", caption: "My Eyes Only: 7" },
  { id: 108, type: 'image', src: "/memories/secret sleepover 2.jpeg", caption: "My Eyes Only: 8" },
  { id: 109, type: 'video', src: "/memories/Secret Video 2 BBB inna kitchen.mp4", caption: "My Eyes Only: 9" },
  { id: 110, type: 'image', src: "/memories/Man look sexy tho.jpeg", caption: "My Eyes Only: 10" },
];

export default function MemoriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Track scroll rotation to influence card styles
  const [currentRotation, setCurrentRotation] = useState(0);

  // Password Protection State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error("Error trying to enable full-screen mode: ", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleHidden = () => {
    if (showHidden) {
      setShowHidden(false);
    } else {
      setShowPasswordModal(true);
      setPasswordInput("");
      setPasswordError(false);
    }
  };

  const handlePasswordSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (passwordInput === "BBB") {
      setShowHidden(true);
      setShowPasswordModal(false);
    } else {
      setPasswordError(true);
      // Shake animation effect could be added here, but simple error state for now
    }
  };
  
  const currentMemories = showHidden ? HIDDEN_MEMORIES : MEMORIES;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map scroll to total degrees of rotation.
  // We'll traverse 720 degrees (2 full spins) over the scroll height.
  // We use this raw value to calculate active items.
  const rotateX = useTransform(smoothProgress, [0, 1], [0, -720]);
  
  useMotionValueEvent(rotateX, "change", (latest) => {
    setCurrentRotation(latest);
  });

  const distance = 800; 

  return (
    <div ref={containerRef} className="bg-christmas-dark min-h-[500vh] relative perspective-2000 overflow-hidden">
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none perspective-container">
            
            <AnimatePresence mode="wait">
            <motion.div 
                key={showHidden ? "hidden" : "normal"} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative w-[300px] h-[400px] md:w-[600px] md:h-[450px] preserve-3d"
                style={{ rotateX }}
            >
                {currentMemories.map((memory, index) => {
                    const count = currentMemories.length;
                    const angleStep = 360 / count;
                    const baseAngle = angleStep * index;
                    
                    // We calculate the effective angle relative to the viewport to determine if it's "in front"
                    // Normalizing the angle to be between -180 and 180 helps us find the "front" (0 degrees)
                    // We add the current rotation (which is negative) to the base placement angle.
                    // This is a rough estimation for opacity/z-index logic in a pure JS way since doing it purely in CSS with 3D transforms is tricky for "fading background".
                    // However, we can use the transform values directly for exact visual correctness, 
                    // but for "hiding the back", we can compute:
                    let effectiveAngle = (baseAngle + currentRotation) % 360;
                    if (effectiveAngle < 0) effectiveAngle += 360;
                    if (effectiveAngle > 180) effectiveAngle -= 360;

                    // effectiveAngle is now approx distance from 0 (front center).
                    // If it's close to 0, it's focused.
                    // If it's > 90 or < -90, it's effectively "behind" the wheel or obscured.
                    
                    const isFocused = Math.abs(effectiveAngle) < (angleStep / 1.5);

                    // Calculate Opacity based on distance from front
                    const opacity = Math.max(0, 1 - (Math.abs(effectiveAngle) / 90));
                    
                    return (
                        <MemoryCard 
                            key={memory.id}
                            memory={memory}
                            angle={baseAngle}
                            distance={distance}
                            opacity={opacity}
                            isFocused={isFocused}
                        />
                    );
                })}
            </motion.div>
            </AnimatePresence>
        
        </div>

        <div className="fixed top-24 right-4 z-50 pointer-events-auto">
             <button
                onClick={toggleFullscreen}
                className="p-3 rounded-full bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-md transition-all shadow-lg"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
        </div>

        <div className="fixed bottom-10 right-10 z-50 pointer-events-auto">
            <button
                onClick={handleToggleHidden}
                className={`p-4 rounded-full shadow-2xl transition-all duration-300 border-2 ${showHidden ? 'bg-christmas-red border-christmas-gold text-white rotate-180' : 'bg-white/10 border-white/20 text-white/50 hover:bg-white/20 hover:text-white'}`}
                title={showHidden ? "Hide Secret Memories" : "Show Secret Memories"}
            >
                {showHidden ? <EyeOff className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </button>
        </div>

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center z-50 animate-bounce">
            <p className="text-white/50 text-sm font-serif">Scroll to explore memories...</p>
        </div>

        {/* Password Modal */}
        <AnimatePresence>
            {showPasswordModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-christmas-dark border border-christmas-gold/30 p-8 rounded-2xl shadow-2xl max-w-sm w-full relative"
                    >
                        <button 
                            onClick={() => setShowPasswordModal(false)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <Lock className="w-10 h-10 text-christmas-gold mx-auto mb-4" />
                            <h3 className="text-xl font-serif text-white mb-2">Secret Access</h3>
                            <p className="text-white/60 text-sm">Enter the password to view secret memories.</p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => {
                                        setPasswordInput(e.target.value);
                                        if (passwordError) setPasswordError(false);
                                    }}
                                    className={`w-full bg-white/5 border ${passwordError ? 'border-red-500 animate-pulse' : 'border-white/10 focus:border-christmas-gold'} rounded-lg px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all`}
                                    placeholder="Enter password..."
                                    autoFocus
                                />
                                {passwordError && (
                                    <p className="text-red-400 text-xs mt-2 pl-1">Incorrect password. Please try again.</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-christmas-gold text-christmas-dark font-medium py-3 rounded-lg hover:bg-white transition-colors shadow-lg shadow-christmas-gold/10"
                            >
                                Unlock Memories
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        <style jsx global>{`
            .perspective-container {
                perspective: 2000px;
            }
            .preserve-3d {
                transform-style: preserve-3d;
            }
            .backface-visible {
                backface-visibility: hidden; /* We hide the backface so when it spins around we don't see the inverted image, cleaning up the look */
            }
        `}</style>
    </div>
  );
}

// Sub-component for individual cards to handle their own video state
function MemoryCard({ memory, angle, distance, opacity, isFocused }: { memory: Memory, angle: number, distance: number, opacity: number, isFocused: boolean }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div 
            className="absolute inset-0 flex items-center justify-center backface-visible"
            style={{
                transform: `rotateX(${angle}deg) translateZ(${distance}px)`,
                opacity: opacity,
                pointerEvents: isFocused ? 'auto' : 'none', // Only allow interaction with the focused card
                zIndex: isFocused ? 50 : 1 // Proper layering
            }}
        >
            <div className={`relative w-full h-full p-4 bg-white/5 border-2 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-500 ${isFocused ? 'border-christmas-gold scale-105 shadow-christmas-gold/20' : 'border-christmas-gold/10 grayscale-[50%]'}`}>
                {memory.type === 'video' ? (
                    <div className="relative w-full h-full group">
                        <video
                            ref={videoRef}
                            src={memory.src}
                            loop
                            muted={!isFocused} // Mute if not in focus just in case
                            playsInline
                            className="w-full h-full object-contain rounded-lg bg-black"
                            onClick={togglePlay}
                        />
                         {/* Play Button Overlay - shows when paused or hovering */}
                        <div 
                            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                            onClick={togglePlay}
                        >
                            <button className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white hover:scale-110 transition-transform">
                                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current pl-1" />}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                         <Image
                            src={memory.src}
                            alt={memory.caption}
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>
                )}
                <div className={`absolute bottom-0 left-0 w-full bg-black/80 p-4 text-center transition-transform duration-500 ${isFocused ? 'translate-y-0' : 'translate-y-full'}`}>
                    <p className="text-christmas-gold font-serif text-xl italic">{memory.caption}</p>
                </div>
            </div>
        </div>
    );
}
