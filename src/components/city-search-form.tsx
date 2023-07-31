import { useRouter } from "next/router"
import { useState } from "react"

export default function CitySearchForm() {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    router.push(`/search-locations/${searchValue}`)
  }

  return (
    <>
      <input
        className="text-gray-900"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search for cities"
      />
      <button onClick={handleClick}>Submit</button>
    </>
  )
}
