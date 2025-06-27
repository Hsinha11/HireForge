
export default async function ApplicationsPage() {
  const res = await fetch('http://localhost:4000/applications', { cache: 'no-store' })
  const apps = await res.json()

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">Your Applications</h1>
      {apps.length === 0 && <p>No applications yet.</p>}
      {apps.map((a: any) => (
        <div key={a.id} className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg">{a.job.title} @ {a.job.company.name}</h2>
          <p className="text-sm text-gray-600">{a.name} ({a.email})</p>
          <p className="mt-2">{a.message}</p>
        </div>
      ))}
    </div>
  )
}
