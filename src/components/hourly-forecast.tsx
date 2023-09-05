import { convertToFahrenheit } from "@/lib/temperature-conversions"
import Image from "next/image"
import { hourlyDataType } from "@/pages/search-locations/[id]"
import dayjs from "dayjs"

export default function HourlyForecast({ hourlyData }: hourlyDataType) {
  const selectedTimesFromHourlyData = [
    hourlyData[0],
    hourlyData[3],
    hourlyData[6],
    hourlyData[9],
    hourlyData[12],
  ]
  const hourlyMap = selectedTimesFromHourlyData.map((timestamp) => {
    const dayjsTime = dayjs.unix(timestamp.dt)
    return (
      <li className="flex flex-col items-center" key={timestamp.dt}>
        <div className="text-xs text-gray-500 md:text-sm">
          {dayjs(dayjsTime).format("h A")}
        </div>
        <Image
          src={`https://openweathermap.org/img/wn/${timestamp.weather[0].icon}@2x.png`}
          alt="weather icon"
          height={52}
          width={52}
        />
        <div className="font-bold">{convertToFahrenheit(timestamp.temp)}°</div>
      </li>
    )
  })

  return (
    <div className="p-8 mt-6 bg-gray-200 md:mt-0 rounded-2xl">
      <p className="font-bold text-gray-500">Today&apos;s Forecast</p>
      <div className="flex justify-center">
        <ul className="flex gap-12 mt-4">{hourlyMap}</ul>
      </div>
    </div>
  )
}
