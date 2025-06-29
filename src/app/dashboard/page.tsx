// import { auth, currentUser } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation"
// import NewJobForm from "./NewJobForm";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// // import Link from "next/link";

// interface Job {
//   id: string;
//   title: string;
//   type: string;
//   location: string;
//   description: string;
//   salary: number;
// }

// export default async function DashboardPage() {
//   const { userId } = await auth()
//   if (!userId) redirect("/sign-in")

//   const user = await currentUser()
//   const role = user?.unsafeMetadata?.role
//   const slug = user?.unsafeMetadata?.slug as string | undefined

//   if (role !== "company" || !slug) redirect("/")
//   console.log(slug)
//   const res = await fetch(`http://localhost:4000/companies/${slug}`, {
//     cache: "no-store",
//   })
//   const company = await res.json()

//   return (
//     <>
//     <Navbar />
//     <main className="p-10 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">📊 {company.name} Dashboard</h1>
      
//       {company.jobs.length === 0 ? (
//         <p className="text-gray-500">You haven&apos;t posted any jobs yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {company.jobs.map((job: Job) => (
//             <li key={job.id} className="p-4 border rounded shadow-md bg-gray-100">
//               <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
//               <p className="text-sm text-gray-600">{job.type} — {job.location}</p>
//               <p className="text-sm text-gray-700 mt-2">{job.description.slice(0, 120)}...</p>
//               <p className="text-sm text-gray-400 mt-1">₹ {job.salary}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* <Link href="/dashboard/applications" className="text-blue-500">View Applications</Link> */}
//       <Link href="/dashboard/applications" className=" mt-10 text-center block w-full bg-blue-500 text-white p-2 rounded-md">View Applications</Link>
//       <NewJobForm companyId={company.id} />
//     </main>
//       </>
//   )
// }


import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import NewJobForm from "./NewJobForm";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: number;
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const user = await currentUser()
  const role = user?.unsafeMetadata?.role
  const slug = user?.unsafeMetadata?.slug as string | undefined

  if (role !== "company" || !slug) redirect("/")
  
  console.log(slug)
  
  // Fetch company and its jobs from Supabase
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select(`
      *,
      jobs (*)
    `)
    .eq('slug', slug)
    .single();

  if (companyError) {
    console.error("Error fetching company:", companyError);
    throw new Error("Failed to fetch company");
  }

  if (!company) {
    redirect("/");
  }

  return (
    <>
    <Navbar />
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">📊 {company.name} Dashboard</h1>
      
      {company.jobs.length === 0 ? (
        <p className="text-gray-500">You haven&apos;t posted any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {company.jobs.map((job: Job) => (
            <li key={job.id} className="p-4 border rounded shadow-md bg-gray-100">
              <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.type} — {job.location}</p>
              <p className="text-sm text-gray-700 mt-2">{job.description.slice(0, 120)}...</p>
              <p className="text-sm text-gray-400 mt-1">₹ {job.salary}</p>
            </li>
          ))}
        </ul>
      )}
      <Link href="/dashboard/applications" className=" mt-10 text-center block w-full bg-blue-500 text-white p-2 rounded-md">View Applications</Link>
      <NewJobForm companyId={company.id} />
    </main>
      </>
  )
}