'use client';

import { useTheme } from '@/lib/hooks/useTheme';
import { useEffect } from 'react';
import React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // useTheme hook handles all theme initialization and application
  useTheme();

  return <>{children}</>;
};
