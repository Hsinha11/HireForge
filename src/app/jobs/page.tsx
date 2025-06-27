// "use client";
// import Footer from "@/components/Footer";

// import Navbar from "@/components/Navbar";
// import { useState } from "react";
// import JobCard from "@/components/JobCard";
// import { Input } from "@/components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { allJobs } from "@/mock/jobs";
// // import { mockJobs } from "@/lib/mockJobs";

// export default function asyncJobsPage() {
  
//   const [title, setTitle] = useState("");
//       const [type, setType] = useState("all");
  
//       const filteredJobs = allJobs.filter(
//           (job) =>
//               job.title.toLowerCase().includes(title.toLowerCase()) &&
//               (type != "all"
//                   ? job.type.toLowerCase() === type.toLowerCase()
//                   : true)
//       );
//   return (<>
//   <Navbar/>
//     <main className="bg-gray-100 min-h-screen py-10">
//         <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">Available Jobs</h1>
//         <div className="max-w-4xl mx-auto p-4 space-y-6">
//             <div className="flex gap-4">
//                 <Input
//                     placeholder="Enter Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="bg-white pl-3 p-3 text-black placeholder-black border-none focus:outline-none focus:ring-0 focus:border-none shadow-[0_2px_10px] shadow-black/10"
//                 />

//                 <Select onValueChange={(val) => setType(val)}>
//                     <SelectTrigger className="w-40 bg-white text-black border-none focus:outline-none focus:ring-0 shadow-[0_2px_10px] shadow-black/10">
//                         <SelectValue placeholder="Filter by type" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white text-black border border-black">
//                         <SelectItem value="all">All</SelectItem>
//                         <SelectItem value="full-time">Full-Time</SelectItem>
//                         <SelectItem value="part-time">Part-Time</SelectItem>
//                         <SelectItem value="internship">Internship</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {filteredJobs.map((job, idx) => (
//                     <JobCard key={idx} {...job} />
//                 ))}
//             </div>
//         </div>
//       </main>
//   <Footer/>
//       </>
//   );
// }

// src/app/jobs/page.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClientJobsPage from "@/app/jobs/ClientJobsPage";

export default async function JobsPage() {
  const res = await fetch("http://localhost:4000/jobs", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  const jobs = await res.json();

  return (
    <>
      <Navbar />
      <ClientJobsPage jobs={jobs} />
      <Footer />
    </>
  );
}
