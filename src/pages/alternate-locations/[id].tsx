import Link from "next/link"
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types"
import { z } from "zod"

export default function AlternateLocations({
  typedGeoData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const locationListMap = typedGeoData.map((location: any) => {
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
    <div className="flex flex-col h-screen">
      <div className="w-screen bg-gray-200 navbar">
        <Link href="/" className="text-xl normal-case btn btn-ghost">
          partlyCloudy
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center mt-4">
          <p className="font-bold">All matching locations for your query:</p>
          <ul>{locationListMap}</ul>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const geoSchema = z
    .object({
      name: z.string(),
      lat: z.number(),
      lon: z.number(),
      country: z.string(),
      state: z.string().optional(),
    })
    .array()
  if (context && context.params) {
    const id = context.params.id
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${id}&limit=5&appid=${process.env.API_KEY}`
    )
    const geoData = await geoRes.json()

    const typedGeoData = geoSchema.parse(geoData)

    return { props: { typedGeoData } }
  } else return { props: {} }
}
