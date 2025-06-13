import Footer from "@/components/Footer";
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";
// import { mockJobs } from "@/lib/mockJobs";

export default function JobsPage() {
  return (<>
  <Navbar/>
    <main className="bg-gray-100 min-h-screen py-10">
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">Available Jobs</h1>
        <JobList />
      </main>
  <Footer/>
      </>
  );
}
