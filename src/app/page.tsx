import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-12">
      <section className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800">HireForge</h1>
        <p className="text-lg text-gray-600">
          Discover your next opportunity. Browse jobs from top companies.
        </p>
        <Link
          href="/jobs"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
        >
          Browse Jobs
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold">100+ Jobs</h3>
          <p className="text-gray-500 text-sm">Across tech, design & more</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Verified Companies</h3>
          <p className="text-gray-500 text-sm">Trusted by real employers</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Built for Devs</h3>
          <p className="text-gray-500 text-sm">Clean UI and simple UX</p>
        </div>
      </section>
    </main>
  );
}
