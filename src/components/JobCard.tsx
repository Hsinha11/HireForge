// src/components/JobCard.tsx
import { Briefcase, ExternalLink, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

type JobProps = {
  id: string
  title: string
  company: string
  location: string
  type: string
  isExternal?: boolean
  externalUrl?: string
}

export default function JobCard({ id, title, company, location, type, isExternal = false, externalUrl }: JobProps) {
  const handleApply = () => {
    if (isExternal && externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="border rounded p-4 shadow-[0_3px_10px] shadow-black/10 bg-white space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{title}</h3>
        {isExternal && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
            External
          </span>
        )}
      </div>
      <p className="text-md text-gray-600">{company}</p>
      <div className="flex items-center gap-4 text-md text-gray-500">
        <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
        <span className="flex items-center gap-1"><Briefcase size={14} /> {type}</span>
      </div>
      
      {isExternal && externalUrl ? (
        <Button 
          variant="outline" 
          className="px-6 py-4 mt-3 text-md flex items-center gap-2 cursor-pointer border border-gray-500 hover:text-white hover:bg-blue-500 text-blue-700"
          onClick={handleApply}
        >
          Apply Externally <ExternalLink strokeWidth={2} />
        </Button>
      ) : (
        <Link href={`/jobs/${id}`}>
          <Button variant="outline" className="px-6 py-4 mt-3 text-md flex items-center gap-2 cursor-pointer border border-gray-500 hover:text-white hover:bg-blue-500 text-blue-700">
            Apply <ExternalLink strokeWidth={2} />
          </Button>
        </Link>
      )}
    </div>
  )
}
