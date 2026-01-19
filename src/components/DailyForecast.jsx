import { getWeatherIcon } from '../utils/weatherApi'

function DailyForecast({ weatherData, units, selectedDayIndex, onDaySelect }) {
  if (!weatherData || !weatherData.daily) return null

  const { daily } = weatherData

  const formatTemperature = (temp) => {
    return Math.round(temp)
  }

  const formatDate = (dateString, index) => {
    const date = new Date(dateString)
    if (index === 0) return 'Today'
    if (index === 1) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <div className="bg-neutral-800 rounded-2xl p-6">
      <h3 className="text-xl font-display font-bold text-neutral-0 mb-6">Daily forecast</h3>
      <div className="space-y-3">
        {daily.time.slice(0, 7).map((date, index) => {
          const weatherIcon = getWeatherIcon(daily.weather_code[index], true)
          const iconPath = `/assets/images/icon-${weatherIcon}.webp`
          const isSelected = selectedDayIndex === index

          return (
            <button
              key={index}
              onClick={() => onDaySelect(index)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                isSelected
                  ? 'bg-neutral-700 ring-2 ring-blue-500'
                  : 'bg-neutral-700/50 hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-20 text-left">
                  <p className="text-neutral-0 font-medium">{formatDate(date, index)}</p>
                </div>
                <img
                  src={iconPath}
                  alt={weatherIcon}
                  className="w-10 h-10 object-contain"
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-neutral-0 font-medium">
                    {formatTemperature(daily.temperature_2m_max[index])}°
                  </span>
                  <span className="text-neutral-300">
                    {formatTemperature(daily.temperature_2m_min[index])}°
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DailyForecast

