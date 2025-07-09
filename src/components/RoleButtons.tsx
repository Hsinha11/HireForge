"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/adminAuth";

export default function RoleButtons() {
  const { user } = useUser()
  const router = useRouter()
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
      }
    };
    checkAdminStatus();
  }, [user]);

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
  }

  return (
    <div className="flex gap-2" role="group" aria-label="User role selection">
      <button 
        onClick={() => setRoleAndRedirect("applicant")} 
        className="text-md cursor-pointer text-blue-700 hover:text-blue-800"
        aria-label="Switch to job seeker mode"
      >
        For Jobseekers
      </button>
      <button 
        onClick={() => setRoleAndRedirect("company")} 
        className="text-md cursor-pointer text-blue-700 hover:text-blue-800"
        aria-label="Switch to company mode"
      >
        For Companies
      </button>
      {isAdminUser && (
        <button 
          onClick={() => router.push("/admin")} 
          className="text-md cursor-pointer text-red-600 hover:text-red-700 font-medium"
          aria-label="Access admin dashboard"
        >
          Admin
        </button>
      )}
    </div>
  )
} 