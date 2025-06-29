"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function RoleButtons() {
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
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => setRoleAndRedirect("applicant")} className="text-md cursor-pointer text-blue-700 hover:text-blue-800">For Jobseekers</button>
      <button onClick={() => setRoleAndRedirect("company")} className="text-md cursor-pointer text-blue-700 hover:text-blue-800">For Companies</button>
    </div>
  )
} 