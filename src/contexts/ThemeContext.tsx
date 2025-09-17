import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'futuristic' | 'corporate';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('futuristic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('safekart-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('safekart-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'futuristic' ? 'corporate' : 'futuristic');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};