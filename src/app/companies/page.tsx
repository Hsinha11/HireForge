"use client"
import React from 'react'
import { allCompanies } from "@/mock/companies";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';

export default function CompaniesPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-10 px-4 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-800">
                        Explore Top Companies
                    </h2>
        {allCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-600">{company.description}</p>

            <div className="mt-4 flex gap-4">
              <Link
                href={`/companies/${company.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Explore Profile
              </Link>
              <Link
                href={`/companies/${company.id}?tab=Jobs`}
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
