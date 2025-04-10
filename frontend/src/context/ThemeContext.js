import { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  const themeSettings = {
    darkMode,
    toggleDarkMode: () => setDarkMode(prev => !prev),
    colors: {
      text: darkMode ? '#ffffff' : '#000000',
      background: darkMode ? '#121212' : '#ffffff',
      paper: darkMode ? '#1e1e1e' : '#f5f5f5',
      primary: darkMode ? '#90caf9' : '#1976d2'
    }
  };

  return (
    <ThemeContext.Provider value={themeSettings}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};