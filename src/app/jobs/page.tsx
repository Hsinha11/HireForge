

// // src/app/jobs/page.tsx
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import ClientJobsPage from "@/app/jobs/ClientJobsPage";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export default async function JobsPage() {
//   // Server-side protection - redirect to sign-in if not authenticated
//   const { userId } = await auth();
  
//   if (!userId) {
//     redirect("/sign-in");
//   }

//   const user = await currentUser();

//   const res = await fetch("http://localhost:4000/jobs", {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch jobs");
//   }
//   const jobs = await res.json();

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen py-10">
//         <div className="max-w-4xl mx-auto p-4">
//           <div className="mb-6">
//             <h1 className="text-center text-3xl font-bold text-blue-600 mb-2">Available Jobs</h1>
//             {/* <p className="text-center text-gray-600">Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</p> */}
//           </div>
//           <ClientJobsPage jobs={jobs} />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// src/app/jobs/page.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClientJobsPage from "@/app/jobs/ClientJobsPage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
export default async function JobsPage() {
  // Server-side protection - redirect to sign-in if not authenticated
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // const user = await currentUser();

  // Fetch jobs from Supabase
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select(`
      *,
      companies (
        name,
        slug
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-blue-600">Available Jobs</h1>
              <Link 
                href="/companies" 
                className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Explore Companies
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          <ClientJobsPage jobs={jobs || []} />
        </div>
      </div>
      <Footer />
    </>
  );
}