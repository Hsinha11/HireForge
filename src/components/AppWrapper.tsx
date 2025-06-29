'use client';

import { useState, useEffect, lazy, Suspense } from 'react';

// Lazy load the LoadingScreen component
const LoadingScreen = lazy(() => import('./LoadingScreen'));

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
    return (
      <Suspense fallback={<div className="fixed inset-0 z-50 flex items-center justify-center bg-white">Loading...</div>}>
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      </Suspense>
    );
  }

  return <>{children}</>;
} 