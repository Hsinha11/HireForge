"use client"
// import { allCompanies } from "@/mock/companies"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import CompanyCard from "@/components/company/CompanyCard"
import CompanyTabs from "@/components/company/CompanyTabs"
import Footer from "@/components/Footer"
import { Loader2 } from "lucide-react"

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  // add other fields as needed
};

interface Company {
  id: string
  name: string
  website: string
  location: string
  employees: string
  tags: string[]
  companyName: string
  description: string
  tab: string
  jobs: Job[]
  // Add other fields as needed
}

export default function CompanyPage() {
  
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "Overview"

  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { slug } = useParams()

useEffect(() => {
  const fetchCompany = async () => {
    try {
      const res = await fetch(`http://localhost:4000/companies/${slug}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      console.log(data) 
      setCompany(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  fetchCompany()
}, [slug])


  if (loading) return <div className="text-center mt-20 flex items-center justify-center text-3xl text-blue-400">Loading... <span className="animate-spin"> <Loader2/> </span>  </div>
  if (error || !company) return notFound()

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <CompanyCard
            name={company.name}
            website={company.website}
            location={company.location}
            employees={company.employees}
            tags={company.tags}
            />
        </div>
        <div className="col-span-2">
          <CompanyTabs
            companyName={company.name}
            description={company.description}
            tab={tab}
            jobs = {company.jobs}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}