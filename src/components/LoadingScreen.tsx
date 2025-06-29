'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulate loading time (you can adjust this)
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete();
      }, 1000); // Wait for fade out animation to complete
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-800 ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="flex flex-col items-center space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/logo.png"
            alt="JobBoard Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Loading spinner */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Loading text */}
        <p className="text-gray-600 font-medium text-sm md:text-base">
          Loading...
        </p>
      </div>
    </div>
  );
} 