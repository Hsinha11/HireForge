import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function CompanyApplicationsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const user = await currentUser()
  const role = user?.unsafeMetadata?.role
  const slug = user?.unsafeMetadata?.slug as string | undefined

  if (role !== "company" || !slug) redirect("/")

  const res = await fetch(`http://localhost:4000/companies/${slug}/applications`, {
    cache: "no-store",
  })
  const applications = await res.json()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6 mt-10 mb-10 bg-gray-100 rounded-lg">
        <Link href="/dashboard" className="text-blue-500 underline text-lg">Back to Dashboard</Link>
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-10 ">Applications Received</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No applications yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app: { id: string; jobTitle: string; name: string; email: string; message: string; createdAt: string }) => (
            <li key={app.id} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Job:</strong> {app.jobTitle}</p>
              <p><strong>Name:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Message:</strong> {app.message}</p>
              <p className="text-sm text-gray-500">{new Date(app.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
