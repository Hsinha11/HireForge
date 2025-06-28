"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export function HeroButtons() {
  const { user } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (role: "applicant" | "company") => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    setIsLoading(true)

    try {
      const current = user.unsafeMetadata?.role
      if (current !== role) {
        await user.update({
          unsafeMetadata: { 
            role: role, 
            slug: role === "company" ? user.id : undefined 
          }
        });
      }

      // Navigate after successful update
      if (role === "company") {
        router.push("/dashboard")
      } else {
        router.push("/jobs")
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
      // Show error to user or handle gracefully
      alert("Failed to update role. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center gap-4 pt-4">
      <button
        onClick={() => handleClick("applicant")}
        disabled={isLoading}
        className="px-12 py-4 text-xl bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Explore Jobs"}
      </button>

      <button
        onClick={() => handleClick("company")}
        disabled={isLoading}
        className="px-12 py-4 border text-xl border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Hire Talent"}
      </button>
    </div>
  )
}

const Hero = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-white text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Find your next opportunity or hire top talent with <span className="text-blue-600">HireForge</span>
        </h1>

        <p className="text-lg text-gray-700">
          A modern platform connecting skilled professionals with great companies.
        </p>

        <HeroButtons />
      </div>
    </section>
  );
};

export default Hero;
