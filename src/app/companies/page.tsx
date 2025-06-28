// "use client"
import React from 'react'
// import { allCompanies } from "@/mock/companies";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Company = {
  id: string;
  name: string;
  description: string;
  slug: string;
  // add other fields as needed
};

export default  async function CompaniesPage() {
  // Server-side protection - redirect to sign-in if not authenticated
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

   const res = await fetch("http://localhost:4000/companies", {cache: 'no-store'});
   const allCompanies = await res.json();
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-10 px-4 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Explore Top Companies
          </h2>
          <p className="text-gray-600">Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</p>
        </div>
        {allCompanies.map((company: Company) => (
          <div key={company.id} className="bg-gray-100 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-600">{company.description}</p>

            <div className="mt-4 flex gap-4">
              <Link
                href={`/companies/${company.slug}`}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Explore Profile
              </Link>
              <Link
                href={`/companies/${company.slug}?tab=Jobs`}
                className="px-4 py-2  text-blue-600 rounded"
              >
                Explore Jobs
              </Link>
            </div>
          </div>
        ))}
      </main>
      <Footer/>
    </>
  );
}
