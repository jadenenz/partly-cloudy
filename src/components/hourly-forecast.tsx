export default function HourlyForecast({ hourlyData }) {
  const hourlyMap = hourlyData.map((timestamp) => {
    return (
      <li key={timestamp.dt}>
        {new Date(timestamp.dt * 1000).toLocaleString()}
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
