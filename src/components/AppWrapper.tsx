'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // If user has visited before, show loading for a shorter time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // First visit - show loading screen and mark as visited
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return <>{children}</>;
} 