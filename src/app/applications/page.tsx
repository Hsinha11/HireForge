import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Application {
  id: string;
  name: string;
  email: string;
  message: string;
  job: {
    title: string;
    companies: {
      name: string;
    };
  };
}

export default async function ApplicationsPage() {
  // Server-side protection
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  // Fetch applications from Supabase
  const { data: apps, error } = await supabase
    .from('applications')
    .select(`
      *,
      jobs (
        title,
        companies (
          name
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error);
  }

  const applications: Application[] = apps?.map(app => ({
    id: app.id,
    name: app.name,
    email: app.email,
    message: app.message,
    job: {
      title: app.jobs?.title || 'Unknown Job',
      companies: {
        name: app.jobs?.companies?.name || 'Unknown Company'
      }
    }
  })) || [];

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">Your Applications</h1>
      <p className="text-gray-600">Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</p>
      
      {applications.length === 0 && <p>No applications yet.</p>}
      {applications.map((a: Application) => (
        <div key={a.id} className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg">{a.job.title} @ {a.job.companies.name}</h2>
          <p className="text-sm text-gray-600">{a.name} ({a.email})</p>
          <p className="mt-2">{a.message}</p>
        </div>
      ))}
    </div>
  )
}