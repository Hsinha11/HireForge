import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import Footer from "@/components/Footer"
import ApplyModal from "@/components/job/ApplyModal"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  // Fetch job from Supabase
  const { data: job, error } = await supabase
    .from('jobs')
    .select(`*, companies ( name )`)
    .eq('id', id)
    .single();

  if (error || !job) {
    return notFound();
  }

  const isAdminJob = job.is_external || job.posted_by === 'admin';

  // Only require auth for company-posted jobs
  if (!isAdminJob) {
    const { userId } = await auth();
    if (!userId) {
      redirect("/sign-in");
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-6">
        <Link href="/jobs" className="text-blue-500 underline text-lg mb-4 block hover:text-blue-600">Back to Jobs</Link>
        <Card className="p-8 space-y-6 border border-gray-200 shadow-lg">
          <div>
            <h1 className="text-3xl font-semibold text-blue-600 ">{job.title}</h1>
            <h2 className="text-sm text-gray-600 mt-2">Company: {job.companies?.name || job.company_name || ""}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} /> {job.type}
            </span>
            <span className="flex items-center gap-1">
              {/* <DollarSign size={16} /> */}
              {job.salary !== undefined && job.salary !== null
                ? `₹${job.salary.toLocaleString?.("en-IN")}`
                : ""}
            </span>
            <span className="flex items-center gap-1">Job Posted :
              <Calendar size={16} /> {new Date(job.created_at ?? job.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Job Description</h3>
            <div style={{ whiteSpace: 'pre-line' }} className="text-gray-700 leading-relaxed">{job.description}</div>
          </div>

          {isAdminJob ? (
            <a
              href={job.external_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors mt-4 cursor-pointer">
                Apply Externally
              </button>
            </a>
          ) : (
            <ApplyModal jobId={job.id} jobTitle={job.title} />
          )}
        </Card>
      </main>
      <Footer />
    </>
  )
}