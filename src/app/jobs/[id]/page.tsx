// // src/app/jobs/[id]/page.tsx
// "use client";
// import { useParams } from "next/navigation";
// import { allJobs } from "@/mock/jobs";
// import { notFound } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import { Briefcase, MapPin } from "lucide-react";

// export default function JobDetailPage() {
//     const params = useParams();
//     const id = params?.id;

//     // TODO: Lookup job by ID
//     const job = allJobs.find((j) => j.id === id);

//     // TODO: Handle not found case
//     if (!job) return notFound();

//     return (
//         <>
//             <Navbar />
//             <main className="max-w-4xl mx-auto py-10 px-4">
//                 <div className="text-3xl font-bold text-blue-600">
//                     {job.title}{" "}
//                 </div>
//                 <div className="text-xl font-bold text-blue-400">
//                     {job.company}{" "}
//                 </div>
//                 <div className="flex items-center gap-4 text-lg text-gray-500">
//                     <span className="flex items-center gap-1">
//                         <MapPin size={14} /> {job.location}
//                     </span>
//                     <span className="flex items-center gap-1">
//                         <Briefcase size={14} /> {job.type}
//                     </span>
//                 </div>

//                 <div className="text-2xl">
//                     <p>Job Description</p>
//                      <p>{job.jd}</p>
//                 </div>
//                 <div>Tags
//                   <div>
//                   { job.tag.map((t,index)=>(
//                     <span key={index} className="bg-blue-300 p-1 mr-2">{t} </span>
//                   )) }
//                   </div>  
//                 </div>
//             </main>
//         </>
//     );
// }
// src/app/jobs/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { allJobs } from "@/mock/jobs"
import Navbar from "@/components/Navbar"
import { Briefcase, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function JobDetailPage() {
  const params = useParams()
  const id = params?.id
  const job = allJobs.find((j) => j.id === id)

  if (!job) return notFound()

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-6">
        <Card className="p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-blue-600">{job.title}</h1>
            <h2 className="text-xl font-medium text-blue-400">{job.company}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} /> {job.type}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.jd}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {job.tag?.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4">

            <Button className="w-full bg-blue-500 hover:bg-blue-800">Apply Now</Button>
          </div>
        </Card>
      </main>
    </>
  )
}
