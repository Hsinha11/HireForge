// src/components/jobs/ClientJobsPage.tsx
"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

// export default function ClientJobsPage({ jobs }: { jobs: any[] }) {
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("all");

//   const filteredJobs = jobs.filter(
//     (job) =>
//       job.title.toLowerCase().includes(title.toLowerCase()) &&
//       (type !== "all"
//         ? job.type.toLowerCase() === type.toLowerCase()
//         : true)
//   );

//   return (
//     <main className="bg-gray-100 min-h-screen py-10">
//       <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">
//         Available Jobs
//       </h1>
//       <div className="max-w-4xl mx-auto p-4 space-y-6">
//         <div className="flex gap-4">
//           <Input
//             placeholder="Enter Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="bg-white pl-3 p-3 text-black placeholder-black border-none focus:outline-none focus:ring-0 focus:border-none shadow-[0_2px_10px] shadow-black/10"
//           />

//           <Select onValueChange={(val) => setType(val)}>
//             <SelectTrigger className="w-40 bg-white text-black border-none focus:outline-none focus:ring-0 shadow-[0_2px_10px] shadow-black/10">
//               <SelectValue placeholder="Filter by type" />
//             </SelectTrigger>
//             <SelectContent className="bg-white text-black border border-black">
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="full-time">Full-Time</SelectItem>
//               <SelectItem value="contract">Contract</SelectItem>
//               <SelectItem value="internship">Internship</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {filteredJobs.map((job, idx) => (
//             <JobCard
//               key={job.id || idx}
//               id={job.id}
//               title={job.title}
//               company={job.company?.name || job.company || ""}
//               location={job.location}
//               type={job.type}
//             />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

export default function ClientJobsPage({ jobs }: { jobs: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  

  const initialTitle = searchParams.get('title') || ''
  const initialType = searchParams.get('type') || 'all'

  const [title, setTitle] = useState(initialTitle)
  const [type, setType] = useState(initialType)

  useEffect(() => {
    const params = new URLSearchParams()
    if (title) params.set('title', title)
    if (type && type !== 'all') params.set('type', type)
    router.push(`/jobs?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, type])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(title.toLowerCase()) &&
      (type !== 'all' ? job.type.toLowerCase() === type.toLowerCase() : true)
  )

  return (
    <main className="bg-gray-100 min-h-screen py-10">
      {/* <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">Available Jobs</h1> */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex gap-4">
          <Input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white pl-3 p-3 text-black placeholder-black border-none focus:outline-none focus:ring-0 focus:border-none shadow-[0_2px_10px] shadow-black/10"
          />

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-40 bg-white text-black border-none focus:outline-none focus:ring-0 shadow-[0_2px_10px] shadow-black/10">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border border-black">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="full-time">Full-Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job, idx) => (
            <JobCard
              key={job.id || idx}
              id={job.id}
              title={job.title}
              company={job.company?.name || ''}
              location={job.location}
              type={job.type}
            />
          ))}
        </div>
      </div>
    </main>
  )
}