'use client'

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold">HireForge</h2>
          <p className="text-sm text-gray-400 mt-2">Connecting talent with opportunity.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-gray-300 mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="text-sm text-gray-400 hover:text-white">Home</Link></li>
            <li><Link href="/jobs" className="text-sm text-gray-400 hover:text-white">Jobs</Link></li>
            <li><Link href="/companies" className="text-sm text-gray-400 hover:text-white">Companies</Link></li>
            <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-gray-300 mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="text-sm text-gray-400 hover:text-white">GitHub</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-white">LinkedIn</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-white">Twitter</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-md text-gray-500 mt-6">
        © {new Date().getFullYear()} HireForge. All rights reserved.
      </div>
    </footer>
  )
}
