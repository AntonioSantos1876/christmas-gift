export default function Footer() {
  return (
    <footer className="relative z-10 bg-white/30 dark:bg-black/40 backdrop-blur-sm border-t border-black/5 dark:border-white/5 py-8 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-christmas-red dark:text-christmas-gold font-serif italic text-lg mb-2">
          To the best gf ever and to my future wife... 💍
        </p>
        <p className="text-gray-600 dark:text-gray-500 text-sm font-light">
          From code with love!!! ❤️
        </p>
        <p className="text-gray-500 dark:text-gray-600 text-xs mt-4">
          © {new Date().getFullYear()} By Your Boyfriend. All rights reserved by Love Inc.
        </p>
      </div>
    </footer>
  );
}
