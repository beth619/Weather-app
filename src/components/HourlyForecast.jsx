import { getWeatherIcon } from '../utils/weatherApi'

function HourlyForecast({ weatherData, units, selectedDayIndex }) {
  if (!weatherData || !weatherData.hourly) return null

  const { hourly, daily } = weatherData

  const formatTemperature = (temp) => {
    return Math.round(temp)
  }

  const formatTime = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    })
  }

  // Get the hours for the selected day
  const getHoursForDay = () => {
    const selectedDate = new Date(daily.time[selectedDayIndex])
    const nextDate = selectedDayIndex < daily.time.length - 1
      ? new Date(daily.time[selectedDayIndex + 1])
      : new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)

    const hours = []
    for (let i = 0; i < hourly.time.length; i++) {
      const hourDate = new Date(hourly.time[i])
      if (hourDate >= selectedDate && hourDate < nextDate) {
        hours.push({
          time: hourly.time[i],
          temperature: hourly.temperature_2m[i],
          weatherCode: hourly.weather_code[i],
        })
      }
    }
    return hours.slice(0, 24) // Limit to 24 hours
  }

  const hours = getHoursForDay()

  if (hours.length === 0) return null

  return (
    <div className="bg-neutral-800 rounded-2xl p-6">
      <h3 className="text-xl font-display font-bold text-neutral-0 mb-6">Hourly forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {hours.map((hour, index) => {
            const weatherIcon = getWeatherIcon(hour.weatherCode, true)
            const iconPath = `/assets/images/icon-${weatherIcon}.webp`

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-3 min-w-[80px] p-4 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <p className="text-sm text-neutral-300 whitespace-nowrap">
                  {formatTime(hour.time)}
                </p>
                <img
                  src={iconPath}
                  alt={weatherIcon}
                  className="w-8 h-8 object-contain"
                />
                <p className="text-lg font-medium text-neutral-0">
                  {formatTemperature(hour.temperature)}°
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HourlyForecast

