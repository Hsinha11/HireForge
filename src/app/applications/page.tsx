import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface Application {
  id: string;
  name: string;
  email: string;
  message: string;
  job: {
    title: string;
    company: {
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

  const res = await fetch('http://localhost:4000/applications', { cache: 'no-store' })
  const apps: Application[] = await res.json()

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">Your Applications</h1>
      <p className="text-gray-600">Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</p>
      
      {apps.length === 0 && <p>No applications yet.</p>}
      {apps.map((a: Application) => (
        <div key={a.id} className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg">{a.job.title} @ {a.job.company.name}</h2>
          <p className="text-sm text-gray-600">{a.name} ({a.email})</p>
          <p className="mt-2">{a.message}</p>
        </div>
      ))}
    </div>
  )
}
