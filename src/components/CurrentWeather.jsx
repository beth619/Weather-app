import { getWeatherIcon } from '../utils/weatherApi'

function CurrentWeather({ weatherData, location, units, loading }) {
  if (!weatherData || !location) return null

  const current = weatherData.current
  const weatherIcon = getWeatherIcon(current.weather_code, current.is_day === 1)
  const iconPath = `/assets/images/icon-${weatherIcon}.webp`

  const formatTemperature = (temp) => {
    return Math.round(temp)
  }

  const getLocationName = () => {
    const parts = [location.name]
    if (location.admin1) parts.push(location.admin1)
    if (location.country) parts.push(location.country)
    return parts.join(', ')
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/assets/images/bg-today-large.svg"
          alt=""
          className="hidden md:block w-full h-full object-cover"
        />
        <img
          src="/assets/images/bg-today-small.svg"
          alt=""
          className="md:hidden w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        {loading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-2xl">
            <img src="/assets/images/icon-loading.svg" alt="Loading" className="w-8 h-8 animate-spin" />
          </div>
        )}

        {/* Location */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-0 mb-1">
            {getLocationName()}
          </h2>
          <p className="text-neutral-200 text-sm">
            {new Date(current.time).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Temperature and Icon */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-7xl md:text-8xl font-display font-bold text-neutral-0">
              {formatTemperature(current.temperature_2m)}
            </div>
            <div className="text-xl text-neutral-200 mt-2">
              {units === 'metric' ? '°C' : '°F'}
            </div>
          </div>
          <img
            src={iconPath}
            alt={weatherIcon}
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-neutral-200 text-sm">Feels like</span>
            </div>
            <div className="text-2xl font-bold text-neutral-0">
              {formatTemperature(current.apparent_temperature)}
              <span className="text-lg">{units === 'metric' ? '°C' : '°F'}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-neutral-200 text-sm">Humidity</span>
            </div>
            <div className="text-2xl font-bold text-neutral-0">
              {current.relative_humidity_2m}%
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-neutral-200 text-sm">Wind</span>
            </div>
            <div className="text-2xl font-bold text-neutral-0">
              {Math.round(current.wind_speed_10m)}
              <span className="text-lg">{units === 'metric' ? ' km/h' : ' mph'}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-neutral-200 text-sm">Precipitation</span>
            </div>
            <div className="text-2xl font-bold text-neutral-0">
              {current.precipitation || 0}
              <span className="text-lg">{units === 'metric' ? ' mm' : ' in'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather

