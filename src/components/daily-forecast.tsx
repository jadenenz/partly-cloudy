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
      <li
        className="grid items-center content-between justify-between grid-cols-3"
        key={day.dt}
      >
        <div className="text-sm text-gray-500">
          {dayjs(dayjsTime).format("ddd")}
        </div>
        <div className="flex items-center">
          <Image
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
            height={52}
            width={52}
          />
          <span className="font-bold">{day.weather[0].main}</span>
        </div>
        <div className="text-gray-500 justify-self-center">
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
      <div className="">
        <ul className="mt-4">{dailyMap}</ul>
      </div>
    </div>
  )
}

// return (
//   <li className="flex items-center justify-around" key={day.dt}>
//     <div className="text-sm text-gray-500">
//       {dayjs(dayjsTime).format("ddd")}
//     </div>
//     <div className="flex items-center">
//       <Image
//         src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//         alt="weather icon"
//         height={52}
//         width={52}
//       />
//       <span className="font-bold">{day.weather[0].main}</span>
//     </div>
//     <div className="text-gray-500">
//       <span className="font-bold text-black">
//         {convertToFahrenheit(day.temp.max)}
//       </span>
//       /{convertToFahrenheit(day.temp.min)}
//     </div>
//   </li>
// )
// })

// return (
// <div className="p-8 mt-6 bg-gray-200 rounded-2xl">
//   <p className="font-bold text-gray-500">7-Day Forecast</p>
//   <div className="flex">
//     <ul className="flex flex-col flex-1 gap-6 mt-4">{dailyMap}</ul>
//   </div>
// </div>
// )
