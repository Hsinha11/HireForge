"use client"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import CompanyCard from "@/components/company/CompanyCard"
import CompanyTabs from "@/components/company/CompanyTabs"
import Footer from "@/components/Footer"
import LoadingScreen from "@/components/LoadingScreen"
import ProtectedRoute from "@/components/ProtectedRoute"
import { supabase } from "@/lib/supabase"

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
      const { data, error } = await supabase
        .from('companies')
        .select(`
          *,
          jobs (*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      
      console.log(data) 
      setCompany(data)
    } catch (err) {
      console.error("Error fetching company:", err);
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  fetchCompany()
}, [slug])

  if (loading) return <LoadingScreen onLoadingComplete={() => {}} />
  if (error || !company) return notFound()

  return (
    <>
      <Navbar />
      <ProtectedRoute>
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
      </ProtectedRoute>
      <Footer />
    </>
  )
}