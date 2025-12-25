"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Gift, Snowflake, RefreshCw, Trophy } from "lucide-react";

export default function GamePage() {
  // We use a canvas to draw the game because it's fast and smooth.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // We use a specific 'ref' to hold the game state instead of normal React state
  // because we update it 60 times a second and we don't want to re-render the whole component that fast!
  const gameState = useRef({
    playerX: 50, // Percentage of the screen width (starts in middle)
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

    // This helper makes a new present appear at a random spot at the top.
    const spawnPresent = () => {
        if (!gameState.current.isPlaying) return;
        gameState.current.presents.push({
            x: Math.random() * (canvas.width - presentSize),
            y: -50, // Start slightly above the screen
            speed: Math.random() * 3 + 2, // Random falling speed
            id: Date.now() + Math.random() // Unique ID
        });
    };

    // THE MAIN GAME LOOP (Run 60 times per second)
    const draw = () => {
        if (!ctx || !canvas) return;
        // 1. Clear the screen so we can draw the next frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Draw Player (It's a red Christmas bag!)
        const playerXPx = (gameState.current.playerX / 100) * (canvas.width - playerWidth);
        
        ctx.fillStyle = "#C41E3A"; // Christmas Red
        ctx.beginPath();
        ctx.roundRect(playerXPx, canvas.height - playerHeight - 10, playerWidth, playerHeight, 10);
        ctx.fill();
        
        // Add gold details to the bag
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = "#FFD700";
        ctx.font = "30px Arial";
        ctx.fillText("💰", playerXPx + 10, canvas.height - 25);


        // 3. Draw and Move Presents
        gameState.current.presents.forEach((p, index) => {
            p.y += p.speed; // Move it down!

            // Draw box
            ctx.fillStyle = index % 2 === 0 ? "#165B33" : "#9D00FF"; // Green or Purple (Her favorite colors)
            ctx.fillRect(p.x, p.y, presentSize, presentSize);
            
            // Draw ribbon
            ctx.fillStyle = "#FFD700";
            ctx.fillRect(p.x + presentSize/2 - 5, p.y, 10, presentSize);
            ctx.fillRect(p.x, p.y + presentSize/2 - 5, presentSize, 10);

            // 4. Collision Detection
            // Did the present hit the bag?
            if (
                p.y + presentSize > canvas.height - playerHeight - 10 &&
                p.y < canvas.height - 10 &&
                p.x + presentSize > playerXPx &&
                p.x < playerXPx + playerWidth
            ) {
                // Catch!
                gameState.current.score += 10;
                setScore(gameState.current.score); // Update React state for the UI to see
                gameState.current.presents.splice(index, 1); // Remove from game
            }

            // Missed the present?
            if (p.y > canvas.height) {
                gameState.current.presents.splice(index, 1);
                // We're nice, so no game over for missing. Just keep playing!
            }
        });

        // Request the next frame if we are still playing
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

    // Mouse controls: Mapping mouse position to game player position
    const handleMouseMove = (e: MouseEvent) => {
        if (!gameState.current.isPlaying) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / canvas.width) * 100;
        gameState.current.playerX = Math.max(0, Math.min(100, percentage));
    };

    // Touch controls: Same thing but for her phone!
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
