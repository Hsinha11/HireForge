'use client'

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
// import Image from "next/image"

export function RoleButtons() {
  const { user } = useUser()
  const router = useRouter()

  const setRoleAndRedirect = async (role: "applicant" | "company") => {
    if (!user) {
      router.push("/sign-in")
      return
    }
      try{
        const currentRole = user.unsafeMetadata?.role
        const currentSlug = user.unsafeMetadata?.slug as string | undefined

        if (role === "company" && currentRole === "company" && currentSlug) {
          router.push("/dashboard")
        } else {
          router.push("/companies/create")
        }

        if (role === "applicant" && currentRole !== "applicant") {
          await user.update({
            unsafeMetadata: { role: "applicant" },
          });
        }
    
        router.push("/jobs");
        return;

      }catch (error) {
      console.error("Failed to update user role:", error);
      alert("Failed to update role. Please try again.");
    }
      // const current = user.unsafeMetadata?.role
      // if (current !== role) {
      //   try {
      //     await user.update({
      //       unsafeMetadata: { role }
      //     });
      //   } catch (error) {
      //     console.error("Failed to update user role:", error);
      //     // Continue anyway - role will be set on next login
      //   }
      // }
  
      // router.push(role === "company" ? "/companies/create" : "/jobs")
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => setRoleAndRedirect("applicant")} className="text-md cursor-pointer text-blue-700 hover:text-blue-800">For Jobseekers</button>
      <button onClick={() => setRoleAndRedirect("company")} className="text-md cursor-pointer text-blue-700 hover:text-blue-800">For Companies</button>
    </div>
  )
}

  export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow px-4 py-4">
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-blue-700 font-heading drop-shadow-lg hover:text-blue-800 transition-colors duration-200 hover:drop-shadow-xl">HireForge
          {/* <Image src="/logo.png" alt="HireForge" width={100} height={100} /> */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
        <RoleButtons />
          
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
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 flex flex-col items-center justify-center gap-2 px-2">
          <RoleButtons />
          
          {/* Show UserButton when signed in */}
          <SignedIn>
            <div className="flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          
          {/* Show Login/Sign Up buttons when signed out */}
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="outline" className="w-full text-blue-600 text-md cursor-pointer hover:text-blue-800">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="w-full text-md bg-blue-600 hover:bg-blue-800 cursor-pointer">Sign Up</Button>
            </Link>
          </SignedOut>
        </div>
      )}
    </nav>
  )
}
