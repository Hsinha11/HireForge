import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isAdminServer } from "@/lib/adminAuthServer";
import AdminDashboard from "@/components/admin/AdminDashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function AdminPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const adminStatus = await isAdminServer();
  
  if (!adminStatus) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto p-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage external job postings and admin features</p>
          </div>
          <AdminDashboard />
        </div>
      </div>
      <Footer />
    </>
  );
} 