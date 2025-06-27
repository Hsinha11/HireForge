'use client'

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow px-4 py-4">
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-blue-600">HireForge</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <button>
          <Link href="/jobs" className="text-sm text-blue-700 hover:text-shadow-blue-800">For Jobseekers</Link>
          </button>
          <Link href="/companies" className="text-sm text-blue-700 hover:text-blue-800">For Companies</Link>
          <Button variant="outline" className="text-blue-600 hover:text-blue-800 cursor-pointer">Login</Button>
          <Button className="bg-blue-600 cursor-pointer hover:bg-blue-800">Sign Up</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          <Link href="/jobs" className="block text-md text-blue-700">For Jobseekers</Link>
          <Link href="/companies" className="block text-md text-blue-700">For Companies</Link>
          <Button variant="outline" className="w-full text-blue-600 text-md cursor-pointer hover:text-blue-800">Login</Button>
          <Button className="w-full text-md bg-blue-600 hover:bg-blue-800 cursor-pointer">Sign Up</Button>
        </div>
      )}
    </nav>
  )
}
