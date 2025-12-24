"use client";

import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

export default function LetterPage() {
  return (
    <div className="min-h-screen py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-black/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20">
            <Star className="w-32 h-32 text-christmas-gold" />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-christmas-gold mb-8 border-b border-white/10 pb-6">
            To My Dearest Future Wife... 🎄❤️
        </h1>

        <div className="space-y-6 text-gray-200 text-lg leading-relaxed font-serif tracking-wide">
            <p>
                My love, as I sit here writing this code, thinking about you, I realize just how lucky I am. 💖 From the moment we first met face-to-face at Glenmuir during those crazy COVID times, I knew there was something special about you. ✨
            </p>
            <p>
                Watching you grow from my best friend into the love of my life has been the greatest privilege. 🌹 We've been through so much together, through all the university hiccups, the late-night stress, and the chaos of life, but you've remained my constant rock and my joy. 🪨💍
            </p>
            <p>
                I am so incredibly proud of you in your final year of pharmacology studies! 💊👩‍⚕️ You are brilliant, resilient, and absolutely beautiful, inside and out. 🧠✨ I know it hasn't always been easy, but seeing you push through with such grace makes me fall in love with you even more every single day. 📈❤️
            </p>
            <p>
                You are my best friend, my lover, and undoubtedly my future wife. 👰💒 I can't wait for all the Christmases we have yet to share, building a lifetime of memories just like the ones in this app. 🏡🎁
            </p>
            <p>
                Thank you for being you. Thank you for choosing me. 🙏 I promise to always support you, to make you smile (remember the contract! 😉), and to love you endlessly.
            </p>
            <p className="text-xl font-bold text-christmas-red mt-8">
                I love you a lot. Merry Christmas, baby! 🎅💏🎄
            </p>
        </div>

        <div className="mt-12 flex justify-center">
            <Heart className="w-12 h-12 text-christmas-red animate-pulse fill-current" />
        </div>

      </motion.div>
    </div>
  );
}
