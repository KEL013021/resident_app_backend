import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const lightColors = {
  background: '#F0FAFF',
  text: '#000',
  icon: '#333',
  header: '#7A97C6',
  card: '#fff',
  label: '#333',
  value: '#444',
  avatarBackground: '#000',
};

const darkColors = {
  background: '#111',
  text: '#fff',
  icon: '#fff',
  header: '#1E1E1E',
  card: '#222',
  label: '#bbb',
  value: '#eee',
  avatarBackground: '#333',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const toggleTheme = () => setIsDark(!isDark);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
