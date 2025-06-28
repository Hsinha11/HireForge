'use client'

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Method 2: Client-side protection with conditional rendering
export default function ProtectedComponent() {
  const { user } = useUser();

  return (
    <div className="space-y-4">
      {/* Show content only when signed in */}
      <SignedIn>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h3>
          <p className="text-green-700">
            You have access to protected content and features.
          </p>
          <div className="mt-4 space-x-2">
            <Link href="/dashboard">
              <Button size="sm">Go to Dashboard</Button>
            </Link>
            <Link href="/applications">
              <Button size="sm" variant="outline">View Applications</Button>
            </Link>
          </div>
        </div>
      </SignedIn>

      {/* Show sign-in prompt when signed out */}
      <SignedOut>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Sign in to access more features
          </h3>
          <p className="text-blue-700 mb-4">
            Create an account or sign in to access your dashboard, applications, and personalized content.
          </p>
          <div className="space-x-2">
            <Link href="/sign-in">
              <Button size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </SignedOut>
    </div>
  );
} 