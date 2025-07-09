'use client'

import Link from "next/link"
import { useState, lazy, Suspense } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"

// Lazy load the RoleButtons component
const RoleButtons = lazy(() => import('./RoleButtons'))

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow px-4 py-4">
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-blue-700 font-heading   hover:text-blue-800 ">HireForge
          {/* <Image src="/logo.png" alt="HireForge" width={100} height={100} /> */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <Suspense fallback={<div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>}>
            <RoleButtons />
          </Suspense>
          
          {/* Show UserButton when signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          {/* Show Login/Sign Up buttons when signed out */}
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="outline" className="text-blue-600 hover:text-blue-800 cursor-pointer">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-blue-600 cursor-pointer hover:bg-blue-800">Sign Up</Button>
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden mt-4 space-y-2" role="navigation" aria-label="Mobile navigation">
          <Suspense fallback={<div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>}>
            <RoleButtons />
          </Suspense>
          
          <SignedIn>
            <div className="flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="flex flex-col space-y-2">
              <Link href="/sign-in">
                <Button variant="outline" className="w-full text-blue-600 hover:text-blue-800 cursor-pointer">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full bg-blue-600 cursor-pointer hover:bg-blue-800">Sign Up</Button>
              </Link>
            </div>
          </SignedOut>
        </div>
      )}
    </nav>
  )
}
