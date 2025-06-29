"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"

interface FormData {
  name: string
  slug: string
  website: string
  location: string
  employees: string
  tags: string
  description: string
}

interface CreateCompanyFormProps {
  userId?: string
}

export default function CreateCompanyForm({ userId }: CreateCompanyFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    slug: "",
    website: "",
    location: "",
    employees: "",
    tags: "",
    description: "",
  })

  const [error, setError] = useState("")
  const { user } = useUser()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const res = await fetch(`${apiUrl}/companies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()),
          userId: userId || user?.id, // Use passed userId or fall back to Clerk user id
        }),
      })

      if (!res.ok) {
        const errorData = await res.text()
        console.error("Server error:", errorData)
        setError("Failed to create company")
        return
      }

      const company = await res.json()

      // Update Clerk metadata if user exists
      if (user) {
        try {
          await user.update({
            unsafeMetadata: {
              role: "company",
              slug: company.slug,
            },
          })
          router.push("/dashboard");

        } catch (updateError) {
          console.error("Failed to update user metadata:", updateError)
          // Don't fail the whole operation if metadata update fails
        }
      }

      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating company:", error)
      setError("Failed to create company. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["name", "slug", "website", "location", "employees", "tags", "description"].map((field) => (
        <input
          key={field}
          required
          placeholder={field}
          value={form[field as keyof FormData]}
          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
          className="w-full p-3 border rounded"
        />
      ))}
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
        Create Company
      </button>
    </form>
  )
}
