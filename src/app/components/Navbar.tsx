"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Gift, Mail, LogOut, Sun, Moon, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
             <span className="text-christmas-red dark:text-christmas-gold font-serif font-bold text-xl tracking-wider">Merry Christmas</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/memories" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/memories') ? 'bg-black/5 dark:bg-white/10 text-christmas-red' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <Gift className="w-4 h-4" />
                Christmas Gift
              </Link>
              
              <Link 
                href="/letter" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/letter') ? 'bg-black/5 dark:bg-white/10 text-christmas-gold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <Mail className="w-4 h-4" />
                Christmas Letter
              </Link>

              <Link 
                href="/game" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/game') ? 'bg-black/5 dark:bg-white/10 text-christmas-green' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <Gamepad2 className="w-4 h-4" />
                Play Game
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {mounted && (
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-christmas-gold hover:scale-110 transition-transform"
                >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            )}
            
            <Link 
                href="/login" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
            >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Exit</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu - simplified */}
        <div className="md:hidden flex justify-around py-2 border-t border-black/5 dark:border-white/10 bg-white/30 dark:bg-black/30">
             <Link href="/memories" className={`p-2 ${isActive('/memories') ? 'text-christmas-red' : 'text-gray-600 dark:text-gray-400'}`}><Gift /></Link>
             <Link href="/letter" className={`p-2 ${isActive('/letter') ? 'text-christmas-gold' : 'text-gray-600 dark:text-gray-400'}`}><Mail /></Link>
             <Link href="/game" className={`p-2 ${isActive('/game') ? 'text-christmas-green' : 'text-gray-600 dark:text-gray-400'}`}><Gamepad2 /></Link>
        </div>
      </div>
    </nav>
  );
}
