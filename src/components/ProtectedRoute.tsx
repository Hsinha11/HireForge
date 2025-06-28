'use client'

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Method 3: Higher-order component for protection
export default function ProtectedRoute({ 
  children, 
  fallback = (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6">
          Please sign in to access this content.
        </p>
        <div className="space-x-4">
          <a 
            href="/sign-in" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
          <a 
            href="/sign-up" 
            className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}: ProtectedRouteProps) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        {fallback}
      </SignedOut>
    </>
  );
} 