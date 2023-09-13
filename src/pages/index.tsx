import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { convertToFahrenheit } from "@/lib/temperature-conversions"
import React, { useState } from "react"
import { useRouter } from "next/router"
import CitySearchForm from "@/components/city-search-form"
import Link from "next/link"
import { NextRequest } from "next/server"
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

export default function Home({ typedData }: any) {
  return (
    <div className="h-screen">
      <div className="w-screen bg-gray-200 navbar">
        <Link href="/" className="text-xl normal-case btn btn-ghost">
          partlyCloudy
        </Link>
      </div>
      <main className="flex justify-center">
        <div className="flex flex-col mt-8">
          <p className="text-4xl font-bold">
            Welcome to partyCloudy, enter a city name
          </p>
          <CitySearchForm />
          <MainWeatherDisplay typedData={typedData} geoName={"test"} />
        </div>
      </main>
    </div>
  )
}

// export default function Home({
//   typedData,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div className="h-screen">
//       <div className="w-screen bg-gray-200 navbar">
//         <Link href="/" className="text-xl normal-case btn btn-ghost">
//           partlyCloudy
//         </Link>
//       </div>
//       <main>
//         <CitySearchForm />
//         <div className="main-current-city">
//           {convertToFahrenheit(typedData.current.temp)}
//         </div>
//       </main>
//     </div>
//   )
// }

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip = req.headers["x-real-ip"]
  if (!ip) {
    const forwardedFor = req.headers["x-forwarded-for"]
    if (Array.isArray(forwardedFor)) {
      ip = forwardedFor.at(0)
    } else {
      ip = forwardedFor?.split(",")
    }
  }

  console.log("XXXXX IP IS: ", ip)

  const userLocation = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_API_KEY}&ip=${ip}`
  )

  const userLocationData = await userLocation.json()

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${userLocationData.latitude}&lon=${userLocationData.longitude}&exclude=minutely,alerts&appid=${process.env.API_KEY}`
  )
  const data = await res.json()
  // console.log("data: ", data)
  const typedData = fetchData.parse(data)
  // console.log("typedData: ", typedData)

  return { props: { typedData } }
}

//"lat":36.1563122,"lon":-95.9927436,

// https://api.openweathermap.org/data/3.0/onecall?lat=36.1563122&loSn=-95.9927436&exclude=minutely,hourly,daily,alerts&appid=cfa56b7e1c85cefc27cb2887c8ae1708

// http://api.openweathermap.org/geo/1.0/direct?q=tulsa,ok,US&limit=5&appid=cfa56b7e1c85cefc27cb2887c8ae1708
