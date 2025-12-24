"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Lock, Calendar, Palette, User } from "lucide-react";
import Footer from "../components/Footer";

// TODO: REPLACE THIS WITH THE REAL LAST NAME or ask the user to input it in the code
const BOYFRIEND_LAST_NAME = "Crawford"; // Placeholder
const TARGET_BIRTHDAY = "2003-10-13";
const TARGET_COLOR = "purple";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    birthday: "",
    color: "",
    lastName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check Birthday
    if (formData.birthday !== TARGET_BIRTHDAY) {
        setError("That's not the right birthday... are you who you say you are? 🧐");
        return;
    }

    // 2. Check Color
    if (formData.color.toLowerCase().trim() !== TARGET_COLOR) {
        setError("Hmm, that doesn't sound like your favorite color. Try again! 🎨");
        return;
    }

    // 3. Check Last Name
    // We do a loose check for the placeholder to allow testing if the user hasn't changed it yet
    const normalizedInputDetails = formData.lastName.toLowerCase().trim();
    const normalizedTarget = BOYFRIEND_LAST_NAME.toLowerCase().trim();
    
    // Safety for the user: if they haven't changed the placeholder code yet, let them in with anything or warn them?
    // Let's assume strict check, but if it is still [LAST_NAME], we might want to just let it pass or fail?
    // Prompt said "will be asked to enter boyfriends last name".
    // I will enforce the check.
    if (normalizedInputDetails !== normalizedTarget && normalizedTarget !== "[last_name]") {
         setError("Incorrect last name! 💔");
         return;
    }

    // Additional check if it IS the placeholder, maybe just let it pass so I can verify?
    // User can change it later.
    
    router.push("/terms");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-christmas-red/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-christmas-gold/20 rounded-full blur-3xl" />

        <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <Lock className="w-8 h-8 text-christmas-gold" />
            </div>
            <h1 className="text-4xl font-serif text-white mb-2">Welcome, Beautiful</h1>
            <p className="text-gray-300">Please verify it's you to open your gift.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-christmas-red" />
                    Your Birthday
                </label>
                <input 
                    type="date" 
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold/50 transition-all"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-her-purple" />
                    Your Favorite Color
                </label>
                <input 
                    type="text" 
                    name="color"
                    placeholder="e.g. Red, Blue..."
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold/50 transition-all placeholder:text-gray-600"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-christmas-gold" />
                    Boyfriend's Last Name
                </label>
                <input 
                    type="text" 
                    name="lastName"
                    placeholder="Enter last name..."
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold/50 transition-all placeholder:text-gray-600"
                    required
                />
            </div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                >
                    {error}
                </motion.div>
            )}

            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-christmas-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-serif font-bold py-4 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
                <span>Unlock Gift</span>
                <Heart className="w-5 h-5 group-hover:fill-current transition-colors" />
            </button>
        </form>
      </motion.div>
      
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
