"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/audio/bells.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Check volume, not too loud

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay prevented or audio source missing:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[100]">
      <button
        onClick={togglePlay}
        className={`p-3 rounded-full shadow-xl transition-all duration-300 border backdrop-blur-md flex items-center gap-2 ${
          isPlaying 
            ? "bg-christmas-red/80 border-christmas-gold text-white animate-pulse" 
            : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white"
        }`}
        title={isPlaying ? "Pause Christmas Bells" : "Play Christmas Bells"}
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        <span className="text-xs font-serif hidden md:inline">
            {isPlaying ? "Jingle Bells!" : "Play Music"}
        </span>
      </button>
    </div>
  );
}
