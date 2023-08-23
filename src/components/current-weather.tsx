import { convertToFahrenheit } from "@/lib/temperature-conversions"
import { hourlyDataType } from "@/pages/search-locations/[id]"
import Image from "next/image"

export default function CurrentWeather({ geoName, typedData }: hourlyDataType) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2">
        <div className="">
          <div className="text-2xl font-bold">{geoName}</div>

          <div className="text-sm text-gray-600">
            {typedData.current.weather[0].main}
          </div>
          <div className="mt-20 text-5xl font-bold">
            {convertToFahrenheit(typedData.current.temp)}°F{" "}
          </div>
        </div>
        <Image
          className=""
          src={`https://openweathermap.org/img/wn/${typedData.current.weather[0].icon}@2x.png`}
          alt="weather icon"
          height={200}
          width={200}
        />
      </div>
      {/* <div>
        Feels like: {convertToFahrenheit(typedData.current.feels_like)}°F
        <br />
        Winds: {typedData.current.wind_speed} m/s
      </div> */}
    </div>
  )
}
