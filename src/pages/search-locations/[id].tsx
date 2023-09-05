import CitySearchForm from "@/components/city-search-form"
import HourlyForecast from "@/components/hourly-forecast"
import CurrentWeather from "@/components/current-weather"
import { convertToFahrenheit } from "@/lib/temperature-conversions"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { z } from "zod"
import AirConditions from "@/components/air-conditions"
import DailyForecast from "@/components/daily-forecast"
import Link from "next/link"
import LocationAlert from "@/components/location-alert"

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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("typedGeo: ", typedGeoData)
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
    <div className="flex justify-center">
      <main>
        <CitySearchForm />
        <div className="md:grid md:grid-cols-[3fr 1fr] md:grid-rows-3 gap-3">
          <div>
            <CurrentWeather geoName={geoName} typedData={typedData} />
          </div>
          <div className="col-start-1">
            <HourlyForecast hourlyData={typedData.hourly} />
          </div>
          <div className="col-start-1">
            <AirConditions typedData={typedData} />
          </div>
          <div className="col-start-2 row-span-3 row-start-2">
            <DailyForecast dailyData={typedData.daily} />
          </div>
        </div>
        <div>
          <ul>{locationList}</ul>
        </div>
        <LocationAlert locationListData={typedGeoData} />
      </main>
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
    const id = context.params.id
    // console.log("XXXXXXXXXXXXXXXXXXID IS: ", id)
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${id}&limit=5&appid=${process.env.API_KEY}`
    )
    const geoData = await geoRes.json()

    const typedGeoData = geoSchema.parse(geoData)
    console.log("GEODATA IS: ", geoData)
    const geoName =
      typedGeoData[0].name +
      ", " +
      (typedGeoData[0].state ? typedGeoData[0].state + ", " : "") +
      typedGeoData[0].country

    console.log("lat is: ", typedGeoData[0].lat)
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${typedGeoData[0].lat}&lon=${typedGeoData[0].lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}`
    )
    const data = await res.json()
    console.log("DATA IS: ", data)
    // console.log("data: ", data)
    const typedData = fetchData.parse(data)
    // console.log("typedData: ", typedData)

    return { props: { typedData, geoName, typedGeoData } }
  } else return { props: {} }
}
