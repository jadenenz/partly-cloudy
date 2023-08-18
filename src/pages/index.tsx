import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { convertToFahrenheit } from "@/lib/temperature-conversions"
import React, { useState } from "react"
import { useRouter } from "next/router"
import CitySearchForm from "@/components/city-search-form"

const fetchData = z.object({
  current: z.object({
    temp: z.number(),
    feels_like: z.number(),
  }),
})

export default function Home({
  typedData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <CitySearchForm />
      <div className="main-current-city">
        {convertToFahrenheit(typedData.current.temp)}
      </div>
    </main>
  )
}

export type hourlyDataType = InferGetServerSidePropsType<
  typeof getServerSideProps
>

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=36.1563122&lon=-95.9927436&exclude=minutely,hourly,daily,alerts&appid=${process.env.API_KEY}`
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
