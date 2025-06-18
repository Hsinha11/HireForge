"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-white text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Find your next opportunity or hire top talent with <span className="text-blue-600">HireForge</span>
        </h1>

        <p className="text-lg text-gray-700">
          A modern platform connecting skilled professionals with great companies.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          
            <Link href="/jobs">
          <button className="px-12 py-4 text-xl bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"> 
            Explore Jobs
          </button>
          </Link>
          
          <button className="px-12 py-4 border text-xl border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition cursor-pointer">
            Hire Talent
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
