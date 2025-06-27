'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ApplyModal({ jobId, jobTitle }: { jobId: string, jobTitle: string }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('http://localhost:4000/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        jobId,
      }),
    })
    setSubmitted(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-800 cursor-pointer">Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="text-center text-green-600 font-semibold">Application submitted successfully!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <Textarea value={message} onChange={e => setMessage(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-800 cursor-pointer">Submit Application</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
