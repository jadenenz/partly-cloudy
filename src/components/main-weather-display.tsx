import AirConditions from "./air-conditions"
import CurrentWeather from "./current-weather"
import DailyForecast from "./daily-forecast"
import HourlyForecast from "./hourly-forecast"

export default function MainWeatherDisplay({ geoName, typedData }: any) {
  return (
    <div className="md:grid md:grid-cols-[3fr 1fr] md:grid-rows-3 gap-3">
      <div>
        <CurrentWeather geoName={geoName} typedData={typedData} />
      </div>
      <div className="col-start-1">
        <HourlyForecast hourlyData={typedData.hourly} />
      </div>
      <div className="col-start-1">
        <AirConditions typedData={typedData} />
      </div>
      <div className="col-start-2 row-span-3 row-start-2">
        <DailyForecast dailyData={typedData.daily} />
      </div>
    </div>
  )
}
