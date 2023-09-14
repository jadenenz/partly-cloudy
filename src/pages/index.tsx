import { z } from "zod"
import type { GetServerSideProps } from "next"
import React from "react"
import CitySearchForm from "@/components/city-search-form"
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

export default function Home({ typedData, geoName }: any) {
  return (
    <div className="min-h-screen">
      <div className="w-screen bg-gray-200 navbar">
        <Link href="/" className="text-xl normal-case btn btn-ghost">
          partlyCloudy
        </Link>
      </div>
      <main className="flex justify-center">
        <div className="flex flex-col mt-8">
          <p className="text-4xl font-bold">
            Welcome to partlyCloudy, enter a city name
          </p>
          <CitySearchForm />
          <MainWeatherDisplay typedData={typedData} geoName={geoName} />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip = req.headers["x-real-ip"]
  if (!ip) {
    const forwardedFor = req.headers["x-forwarded-for"]
    if (Array.isArray(forwardedFor)) {
      ip = forwardedFor.at(0)
    } else {
      ip = forwardedFor?.split(",")
    }
    if (ip?.includes("::ffff:127.0.0.1")) {
      ip = ["8.8.8.8"]
    }
  }

  const userLocation = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_API_KEY}&ip=${ip}`
  )

  const userLocationData = await userLocation.json()

  const locationNameSearch = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${userLocationData.latitude}&lon=${userLocationData.longitude}&limit=5&appid=${process.env.API_KEY}`
  )

  const locationNameData = await locationNameSearch.json()

  const geoName =
    locationNameData[0].name +
    ", " +
    (locationNameData[0].state ? locationNameData[0].state + ", " : "") +
    locationNameData[0].country

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${userLocationData.latitude}&lon=${userLocationData.longitude}&exclude=minutely,alerts&appid=${process.env.API_KEY}`
  )
  const data = await res.json()
  const typedData = fetchData.parse(data)

  return { props: { typedData, geoName } }
}
