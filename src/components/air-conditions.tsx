import { convertToFahrenheit } from "@/lib/temperature-conversions"
import { hourlyDataType } from "@/pages/search-locations/[id]"

export default function AirConditions({ typedData }: hourlyDataType) {
  return (
    <div className="p-8 mt-6 bg-gray-200 md:mt-0 rounded-2xl">
      <p className="mb-4 font-bold text-gray-500">Air Conditions</p>
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        {/* ------------------------------ */}
        <div className="flex flex-col">
          <div className="flex text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
            </svg>
            <p>Real Feel</p>
          </div>
          <p className="text-2xl font-bold">
            {convertToFahrenheit(typedData.current.feels_like)}°
          </p>
        </div>
        {/* ------------------------------ */}
        <div className="flex flex-col">
          <div className="flex text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
            </svg>
            <p>Wind</p>
          </div>
          <p className="text-2xl font-bold">
            {typedData.current.wind_speed}m/s
          </p>
        </div>
        {/* ------------------------------ */}
        <div className="flex flex-col">
          <div className="flex text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <p>Expected rainfall</p>
          </div>
          <p className="text-2xl font-bold">
            {typedData.daily[0].rain ? typedData.daily[0].rain : 0}mm
          </p>
        </div>
        {/* ------------------------------ */}
        <div className="flex flex-col">
          <div className="flex text-gray-500">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              height={24}
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
            <p>UV Index</p>
          </div>
          <p className="text-2xl font-bold">{typedData.current.uvi}</p>
        </div>
        {/* ------------------------------ */}
      </div>
    </div>
  )
}
