
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="w-9 h-9 p-0 rounded-full hover:bg-accent hover:text-accent-foreground"
    >
      {isDark ? 
        <Moon size={18} className="text-foreground" /> : 
        <Sun size={18} className="text-primary" />
      }
    </Button>
  );
};

export default ThemeToggle;
