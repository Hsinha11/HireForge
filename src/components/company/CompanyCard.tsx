import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, MapPin } from "lucide-react"

type Props = {
  name: string
  website: string
  location: string
  employees: string
  tags: string[]
}

export default function CompanyCard({ name, website, location, employees, tags }: Props) {
  return (
    <Card className="w-full shadow-md border border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div className="text-xl font-bold">{name}</div>

        <div className="flex items-center text-sm text-blue-600 gap-2">
          <Globe size={16} />
          <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {website}
          </a>
        </div>

        <div className="flex items-center text-sm text-gray-700 gap-2">
          <MapPin size={16} /> {location}
        </div>

        <div className="flex items-center text-sm text-gray-700 gap-2">
          <Users size={16} /> {employees} employees
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-full px-2 py-1 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
