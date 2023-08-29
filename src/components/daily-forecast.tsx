import { convertToFahrenheit } from "@/lib/temperature-conversions"
import { hourlyDataType } from "@/pages/search-locations/[id]"
import dayjs from "dayjs"
import Image from "next/image"

export default function DailyForecast({ dailyData }: hourlyDataType) {
  console.log(dailyData)

  const daysOfTheWeekData = [
    dailyData[0],
    dailyData[1],
    dailyData[2],
    dailyData[3],
    dailyData[4],
    dailyData[5],
    dailyData[6],
  ]

  const dailyMap = daysOfTheWeekData.map((day) => {
    const dayjsTime = dayjs.unix(day.dt)
    return (
      <li className="flex flex-col items-center" key={day.dt}>
        <div className="text-sm text-gray-500">
          {dayjs(dayjsTime).format("ddd")}
        </div>
        {/* <Image
          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          alt="weather icon"
          height={52}
          width={52}
        /> */}
        <div className="text-gray-500">
          <span className="font-bold text-black">
            {convertToFahrenheit(day.temp.max)}
          </span>
          /{convertToFahrenheit(day.temp.min)}
        </div>
      </li>
    )
  })

  return (
    <div className="p-8 mt-6 bg-gray-200 rounded-2xl">
      <p className="font-bold text-gray-500">7-Day Forecast</p>
      <div className="flex">
        <ul className="flex flex-col gap-12 mt-4">{dailyMap}</ul>
      </div>
    </div>
  )
}
