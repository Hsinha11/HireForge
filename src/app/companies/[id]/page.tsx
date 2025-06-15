"use client"
import { allCompanies } from "@/mock/companies"
import { notFound, useParams, useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import CompanyCard from "@/components/company/CompanyCard"
import CompanyTabs from "@/components/company/CompanyTabs"
import Footer from "@/components/Footer"

export default function CompanyPage() {
  const params = useParams();
  const id = params.id
  const searchParams = useSearchParams(); // Hook
  const tab = searchParams.get("tab") || "Overview" ;
  const company = allCompanies.find((c) => c.id === id)
  if (!company) return notFound()

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
          <CompanyTabs companyName={company.name} description={company.description} 
          tab = {tab}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}
