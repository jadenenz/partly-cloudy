import { convertToFahrenheit } from "@/lib/temperature-conversions"
import { hourlyDataType } from "@/pages"
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
      <li key={timestamp.dt}>
        <div>{dayjs(dayjsTime).format("h A")}</div>
        <div>{convertToFahrenheit(timestamp.temp)} °F</div>
      </li>
    )
  })

  return (
    <div>
      <div>
        <h1>Hourly</h1>
        <ul>{hourlyMap}</ul>
      </div>
    </div>
  )
}
