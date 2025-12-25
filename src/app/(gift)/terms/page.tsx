"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Scroll, Check } from "lucide-react";

// This page is a playful "legal" contract before she gets her gift.
// It sets a fun tone and ensures she agrees to "smile" and "accept hugs".
export default function TermsPage() {
  const router = useRouter();

  const handleAccept = () => {
    // Once she clicks the big green button, we officially start the journey
    // by taking her to the memory lane.
    // In a real app we might set a cookie here, but for this gift, simple navigation is enough.
    router.push("/memories");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Another smooth animation to make the 'contract' slide in nicely */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full bg-black/40 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
      >
         {/* A little gradient bar at the top for style */}
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-christmas-green via-christmas-red to-christmas-gold" />
         
         <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                <Scroll className="w-10 h-10 text-christmas-gold" />
            </div>
            <h1 className="text-4xl font-serif text-white mb-4">Terms & Conditions</h1>
            <p className="text-gray-400 font-serif italic text-lg">For this Christmas & The New Year</p>
         </div>

         {/* The Scrollable Terms List */}
         <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10 max-h-[400px] overflow-y-auto custom-scrollbar">
            <h3 className="text-xl text-christmas-gold font-serif mb-4">Contract of Affection</h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed font-light">
                <p>
                    <strong>1. Agreement to Joy:</strong> By clicking "I Accept", the user agrees to have an amazing Christmas and to let go of any stress from the past year.
                </p>
                <p>
                    <strong>2. Mandatory Smiles:</strong> It is mandatory to smile at least 10 times a day, especially when thinking about us.
                </p>
                <p>
                    <strong>3. Unlimited Hugs Clause:</strong> The "Boyfriend" reserves the right to deliver unlimited hugs and kisses, which cannot be refused under this agreement.
                </p>
                <p>
                    <strong>4. Future Adventures:</strong> The user agrees to participate in new adventures, dinner dates, and movie nights throughout the upcoming New Year.
                </p>
                <p>
                    <strong>5. Memory Creation policy:</strong> Both parties agree to create lasting memories, take silly photos, and support each other through 2026 and beyond.
                </p>
                <p className="italic text-sm text-gray-500 mt-4">
                    * This contract is binding by love and sealed with a virtual kiss.
                </p>
            </div>
         </div>

         <div className="flex justify-center">
            <button 
                onClick={handleAccept}
                className="bg-christmas-green hover:bg-green-800 text-white font-serif font-bold py-3 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
                <Check className="w-5 h-5" />
                <span>I Accept These Terms</span>
            </button>
         </div>
      </motion.div>
    </div>
  );
}
