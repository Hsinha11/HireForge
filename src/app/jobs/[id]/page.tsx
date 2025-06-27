import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Briefcase, MapPin, Calendar, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import Footer from "@/components/Footer"
import ApplyModal from "@/components/job/ApplyModal"


type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/jobs/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    return notFound()
  }

  const job = await res.json()

  if (!job) return notFound()

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-6">
      
        <Card className="p-8 space-y-6 border border-gray-200 shadow-lg">
          <div>
            <h1 className="text-3xl font-semibold text-blue-600 ">{job.title}</h1>
            <h2 className="text-sm text-gray-600 mt-2">Company: {job.company?.name}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} /> {job.type}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={16} />{job.salary.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">Job Posted :
              <Calendar size={16} /> {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>
          <ApplyModal jobId={job.id} jobTitle={job.title} />
    

        </Card>
      </main>
      <Footer />
    </>
  )
}
