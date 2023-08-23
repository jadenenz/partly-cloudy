import CitySearchForm from "@/components/city-search-form"
import HourlyForecast from "@/components/hourly-forecast"
import CurrentWeather from "@/components/current-weather"
import { convertToFahrenheit } from "@/lib/temperature-conversions"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { z } from "zod"
import AirConditions from "@/components/air-conditions"

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
    })
    .array(),
})

export default function SearchLocation({
  typedData,
  geoName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex justify-center">
      <main>
        <CitySearchForm />
        <CurrentWeather geoName={geoName} typedData={typedData} />
        <div className="mt-6">
          <HourlyForecast hourlyData={typedData.hourly} />
        </div>
        <AirConditions typedData={typedData} />
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

    return { props: { typedData, geoName } }
  } else return { props: {} }
}
