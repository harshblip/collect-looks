'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setTheme } from '@/lib/slice/generalSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.utility.theme);

  const updateTheme = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));

    // Apply theme to HTML element
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  useEffect(() => {
    // Apply theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setTheme: updateTheme,
  };
};
