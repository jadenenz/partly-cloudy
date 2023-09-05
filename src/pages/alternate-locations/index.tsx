import Link from "next/link"
import { hourlyDataType } from "../search-locations/[id]"

export default function AlternateLocations({
  locationListData,
}: hourlyDataType) {
  const locationListMap = locationListData.map((location: any) => {
    return (
      <li key={location.lat}>
        <Link
          href={`/search-locations/${location.name}${
            location.state ? "," + location.state : ""
          },${location.country}`}
        >
          {location.name +
            ", " +
            (location.state ? location.state + ", " : "") +
            location.country}
        </Link>
      </li>
    )
  })

  return (
    <div>
      <ul>{locationListMap}</ul>
    </div>
  )
}
