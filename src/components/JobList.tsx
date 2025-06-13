// src/components/JobList.tsx
'use client'

import { useState } from "react"
import JobCard from "./JobCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const allJobs = [
  {id:1, title: "Frontend Developer", company: "TechCorp", location: "Remote", type: "fulltime" ,tag:{}},
  { id:2,title: "Backend Engineer", company: "InnoSoft", location: "Bangalore", type: "parttime" ,tag:{}},
  { id:3,title: "Data Analyst", company: "DataVerse", location: "Remote", type: "internship" ,tag:{}},
]

export default function JobList() {
  const [title, setTitle] = useState("")
  const [type, setType] = useState("all")

  const filteredJobs = allJobs.filter(job =>
    job.title.toLowerCase().includes(title.toLowerCase()) &&
    (type!="all"? (job.type.toLowerCase() === type.toLowerCase())  : true)
  )

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* <div className="flex gap-4">
        <Input
        className="bg-white border-none outline-none focus:ring-0 focus:outline-none focus:border-none shadow-none"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select onValueChange={(val) => setType(val)}>
          <SelectTrigger className="w-40 bg-white border border-gray-300 text-black">
            <SelectValue placeholder="Filter by type" className="placeholder-black"/>
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Full-Time">Full-Time</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
<div className="flex gap-4">
  <Input
    placeholder="Enter Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="bg-white pl-3 p-3 text-black placeholder-black border-none focus:outline-none focus:ring-0 focus:border-none shadow-[0_2px_10px] shadow-black/10"
  />

  <Select onValueChange={(val) => setType(val)}>
    <SelectTrigger className="w-40 bg-white text-black border-none focus:outline-none focus:ring-0 shadow-[0_2px_10px] shadow-black/10">
      <SelectValue placeholder="Filter by type" />
    </SelectTrigger>
    <SelectContent className="bg-white text-black border border-black">
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="fulltime">Full-Time</SelectItem>
      <SelectItem value="parttime">Part-Time</SelectItem>
      <SelectItem value="internship">Internship</SelectItem>
    </SelectContent>
  </Select>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job, idx) => (
          <JobCard key={idx} {...job} />
        ))}
      </div>
    </div>
  )
}
