// app/not-found.tsx
'use client';

import { Ghost } from "lucide-react";
import Link from "next/link"; // Assuming you're using Next.js

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-100 text-center px-4">
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-8xl font-extrabold text-red-600 italic">404</h1>
        <Ghost className="w-30 h-30 text-red-500 animate-bounce" />
      </div>
      <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="text-gray-500 mt-2 text-lg">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg text-xl hover:bg-blue-700 transition-all duration-300 shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}
