"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Gift, Snowflake, RefreshCw, Trophy } from "lucide-react";

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game state refs for animation loop
  const gameState = useRef({
    playerX: 50, // Percentage
    presents: [] as { x: number; y: number; speed: number; id: number }[],
    score: 0,
    isPlaying: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 100; // Account for navbar/footer
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const playerWidth = 60;
    const playerHeight = 60;
    const presentSize = 40;

    let animationFrameId: number;
    let spawnInterval: NodeJS.Timeout;

    const spawnPresent = () => {
        if (!gameState.current.isPlaying) return;
        gameState.current.presents.push({
            x: Math.random() * (canvas.width - presentSize),
            y: -50,
            speed: Math.random() * 3 + 2,
            id: Date.now() + Math.random()
        });
    };

    const draw = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Player (Santa's Bag)
        const playerXPx = (gameState.current.playerX / 100) * (canvas.width - playerWidth);
        
        ctx.fillStyle = "#C41E3A"; // Christmas Red
        ctx.beginPath();
        ctx.roundRect(playerXPx, canvas.height - playerHeight - 10, playerWidth, playerHeight, 10);
        ctx.fill();
        
        // Bag details
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = "#FFD700";
        ctx.font = "30px Arial";
        ctx.fillText("💰", playerXPx + 10, canvas.height - 25);


        // Draw Presents
        gameState.current.presents.forEach((p, index) => {
            p.y += p.speed;

            // Draw present
            ctx.fillStyle = index % 2 === 0 ? "#165B33" : "#9D00FF"; // Green or Purple
            ctx.fillRect(p.x, p.y, presentSize, presentSize);
            
            // Ribbon
            ctx.fillStyle = "#FFD700";
            ctx.fillRect(p.x + presentSize/2 - 5, p.y, 10, presentSize);
            ctx.fillRect(p.x, p.y + presentSize/2 - 5, presentSize, 10);

            // Collision Detection
            if (
                p.y + presentSize > canvas.height - playerHeight - 10 &&
                p.y < canvas.height - 10 &&
                p.x + presentSize > playerXPx &&
                p.x < playerXPx + playerWidth
            ) {
                // Catch!
                gameState.current.score += 10;
                setScore(gameState.current.score);
                gameState.current.presents.splice(index, 1);
            }

            // Missed
            if (p.y > canvas.height) {
                gameState.current.presents.splice(index, 1);
                // Optional: Game Over on miss? Let's assume infinite play for fun.
                // Or maybe lose life? Simple infinite score based.
            }
        });

        if (gameState.current.isPlaying) {
            animationFrameId = requestAnimationFrame(draw);
        }
    };

    const startGame = () => {
        gameState.current.presents = [];
        gameState.current.score = 0;
        gameState.current.isPlaying = true;
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
        draw();
        spawnInterval = setInterval(spawnPresent, 1000); // New present every second
    };

    const stopGame = () => {
        gameState.current.isPlaying = false;
        clearInterval(spawnInterval);
        cancelAnimationFrame(animationFrameId);
        setGameStarted(false);
    };

    // Controls
    const handleMouseMove = (e: MouseEvent) => {
        if (!gameState.current.isPlaying) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / canvas.width) * 100;
        gameState.current.playerX = Math.max(0, Math.min(100, percentage));
    };

    // Touch controls
    const handleTouchMove = (e: TouchEvent) => {
        if (!gameState.current.isPlaying) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = (x / canvas.width) * 100;
         gameState.current.playerX = Math.max(0, Math.min(100, percentage));
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);
    
    // Expose start function to react component
    (window as any).startChristmasGame = startGame;

    return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
        clearInterval(spawnInterval);
        cancelAnimationFrame(animationFrameId);
        delete (window as any).startChristmasGame;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <h1 className="text-4xl font-serif text-christmas-gold mt-8 mb-4 flex items-center gap-3">
        <Trophy className="w-8 h-8" />
        Score: {score}
      </h1>

      <div className="relative">
          <canvas 
            ref={canvasRef} 
            className="border-4 border-christmas-gold/30 rounded-xl bg-black/20 backdrop-blur-sm cursor-none touch-none"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
          
          {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => (window as any).startChristmasGame && (window as any).startChristmasGame()}
                    className="px-8 py-4 bg-christmas-red text-white text-2xl font-bold rounded-full shadow-lg border-2 border-christmas-gold flex items-center gap-3"
                  >
                        <Gift className="w-8 h-8 animate-bounce" />
                        Start Game
                  </motion.button>
              </div>
          )}
      </div>

      <p className="mt-4 text-gray-400 text-sm">Move your mouse or finger to catch the presents!</p>
    </div>
  );
}
