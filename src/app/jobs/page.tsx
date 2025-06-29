

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
          <div className="mb-6">
            <h1 className="text-center text-3xl font-bold text-blue-600 mb-2">Available Jobs</h1>
          </div>
          <ClientJobsPage jobs={jobs || []} />
        </div>
      </div>
      <Footer />
    </>
  );
}