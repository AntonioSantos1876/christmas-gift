"use client";

import { useEffect, useRef } from "react";

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create a bunch of snowflakes with random properties
    const snowflakes: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
    const count = 100; // How many flakes do we want?

    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1, // Varying sizes
            speed: Math.random() * 1 + 0.5, // Varying fall speeds
            opacity: Math.random() * 0.5 + 0.3 // Some are see-through
        });
    }

    // This function runs every frame to draw the snow
    function draw() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (let i = 0; i < snowflakes.length; i++) {
            const flake = snowflakes[i];
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
        }
        ctx.fill();
        move();
    }

    // This updates the position of each flake
    function move() {
        for (let i = 0; i < snowflakes.length; i++) {
            const flake = snowflakes[i];
            flake.y += flake.speed;
            
            // Add a little side-to-side sway (sine wave) for realism
            flake.x += Math.sin(flake.y / 50) * 0.5;

            // If it hits the bottom, send it back to the top!
            if (flake.y > height) {
                flake.y = 0;
                flake.x = Math.random() * width;
            }
        }
        requestAnimationFrame(draw);
    }

    const animationId = requestAnimationFrame(draw);

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
