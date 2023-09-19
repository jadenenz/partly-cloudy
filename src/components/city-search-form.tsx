import { useRouter } from "next/router"
import { useState } from "react"
import { Input } from "./input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CitySearchForm({ id }: any) {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    router.push(`/search-locations/${encodeURIComponent(searchValue)}`)
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mt-8">
        <Input
          className=""
          value={searchValue}
          onChange={handleChange}
          placeholder="Search for cities"
        />
        <Button onClick={handleClick} variant="outline">
          Submit
        </Button>
      </div>
      {id && (
        <Link className="max-w-xs" href={`/alternate-locations/${id}`}>
          Wrong location?
        </Link>
      )}
    </div>
  )
}
