
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from "@/lib/utils";

// Theme context
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function Layout({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <style>{`
        :root {
          --bg-primary: #ffffff;
          --bg-secondary: #f3f4f6;
          --bg-card: #ffffff;
          --bg-card-hover: #f9fafb;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-light: #f3f4f6;
        }
        
        .dark {
          --bg-primary: #030712;
          --bg-secondary: #111827;
          --bg-card: rgba(17, 24, 39, 0.6);
          --bg-card-hover: rgba(255, 255, 255, 0.05);
          --text-primary: #ffffff;
          --text-secondary: #9ca3af;
          --text-muted: #6b7280;
          --border-color: rgba(255, 255, 255, 0.1);
          --border-light: rgba(255, 255, 255, 0.05);
        }
      `}</style>
      
      <div className={cn(
        "min-h-screen transition-colors duration-300",
        theme === 'dark' 
          ? "bg-[#030712] text-white" 
          : "bg-gray-50 text-gray-900"
      )}>
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className={cn(
            "fixed top-4 right-4 z-50 p-2.5 rounded-xl border backdrop-blur-xl transition-all duration-300",
            theme === 'dark'
              ? "bg-white/10 border-white/10 hover:bg-white/20 text-white"
              : "bg-white border-gray-200 hover:bg-gray-100 text-gray-700 shadow-sm"
          )}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {children}
      </div>
    </ThemeContext.Provider>
  );
}
