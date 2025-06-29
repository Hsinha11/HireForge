"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export function HeroButtons() {
  const { user } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // const handleClick = async (role: "applicant" | "company") => {
  //   if (!user) {
  //     router.push("/sign-in")
  //     return
  //   }

  //   setIsLoading(true)

  //   try {
  //     const current = user.unsafeMetadata?.role
  //     if (current !== role) {
  //       await user.update({
  //         unsafeMetadata: { 
  //           role: role, 
  //           slug: role === "company" ? user.id : undefined 
  //         }
  //       });
  //     }

  //     // Navigate after successful update
  //     if (role === "company") {
  //       router.push("/companies/create")
  //     } else {
  //       router.push("/jobs")
  //     }
  //   } catch (error) {
  //     console.error("Failed to update user role:", error);
  //     // Show error to user or handle gracefully
  //     alert("Failed to update role. Please try again.")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  // const handleClick = async (role: "applicant" | "company") => {
  //   if (!user) {
  //     router.push("/sign-in");
  //     return;
  //   }
  
  //   setIsLoading(true);
  
  //   try {
  //     const currentRole = user.unsafeMetadata?.role;
  //     const currentSlug = user.unsafeMetadata?.slug as string | undefined;
  
  //     // Handle company case
  //     if (role === "company") {
  //       // Already a company
  //       if (currentRole === "company") {
  //         if (currentSlug) {
  //           router.push("/dashboard"); // ✅ has slug → dashboard
  //         } else {
  //           router.push("/companies/create"); // 🚧 no slug → complete profile
  //         }
  //       } else {
  //         // Switching role → update metadata, assign temporary slug
  //         await user.update({
  //           unsafeMetadata: {
  //             role: "company",
  //             slug: user.id, // temporary, overwritten by form later
  //           },
  //         });
  //         router.push("/companies/create");
  //       }
  
  //       return; // done
  //     }
  
  //     // Handle applicant case
  //     if (role === "applicant" && currentRole !== "applicant") {
  //       await user.update({
  //         unsafeMetadata: { role: "applicant" },
  //       });
  //     }
  
  //     // Redirect applicants
  //     router.push("/jobs");
  //   } catch (error) {
  //     console.error("Failed to update user role:", error);
  //     alert("Failed to update role. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const handleClick = async (role: "applicant" | "company") => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const currentRole = user.unsafeMetadata?.role;
      const currentSlug = user.unsafeMetadata?.slug as string | undefined;
  
      if (role === "company") {
        // already a company with slug
        if (currentRole === "company" && currentSlug) {
          router.push("/dashboard");
        } else {
          // send to form, we'll set metadata *after* form is submitted
          router.push("/companies/create");
        }
        return;
      }
  
      // If applicant role not set, set it
      if (role === "applicant" && currentRole !== "applicant") {
        await user.update({
          unsafeMetadata: { role: "applicant" },
        });
      }
  
      router.push("/jobs");
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert("Failed to update role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
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
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 leading-tight performance-optimized">
          Find your next opportunity or hire top talent with <span className="text-blue-700 font-bold performance-optimized ">HireForge</span>
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
