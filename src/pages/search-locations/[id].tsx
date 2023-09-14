import CitySearchForm from "@/components/city-search-form"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { z } from "zod"
import Link from "next/link"
import MainWeatherDisplay from "@/components/main-weather-display"

const fetchData = z.object({
  current: z.object({
    temp: z.number(),
    feels_like: z.number(),
    wind_speed: z.number(),
    uvi: z.number(),
    weather: z
      .object({
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      })
      .array(),
  }),
  hourly: z
    .object({
      dt: z.number(),
      temp: z.number(),
      weather: z
        .object({
          icon: z.string(),
        })
        .array(),
    })
    .array(),
  daily: z
    .object({
      temp: z.object({
        min: z.number(),
        max: z.number(),
      }),
      rain: z.optional(z.number()),
      dt: z.number(),
      weather: z
        .object({
          main: z.string(),
          icon: z.string(),
        })
        .array(),
    })
    .array(),
})

export default function SearchLocation({
  typedData,
  geoName,
  typedGeoData,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const locationList = typedGeoData.map((location: any) => {
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
    <div className="min-h-screen">
      <div className="w-screen bg-gray-200 navbar">
        <Link href="/" className="text-xl normal-case btn btn-ghost">
          partlyCloudy
        </Link>
      </div>
      <div className="flex justify-center">
        <main>
          <CitySearchForm id={id} />
          <MainWeatherDisplay geoName={geoName} typedData={typedData} />
        </main>
      </div>
    </div>
  )
}

export type hourlyDataType = InferGetServerSidePropsType<
  typeof getServerSideProps
>

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
    try {
      const id = context.params.id
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${id}&limit=50&appid=${process.env.API_KEY}`
      )
      const geoData = await geoRes.json()

      const typedGeoData = geoSchema.parse(geoData)
      const geoName =
        typedGeoData[0].name +
        ", " +
        (typedGeoData[0].state ? typedGeoData[0].state + ", " : "") +
        typedGeoData[0].country

      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${typedGeoData[0].lat}&lon=${typedGeoData[0].lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}`
      )

      const data = await res.json()
      const typedData = fetchData.parse(data)
      return { props: { typedData, geoName, typedGeoData, id } }
    } catch (e) {
      return { props: {} }
    }
  } else return { props: {} }
}
