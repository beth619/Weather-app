import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import UnitsDropdown from './components/UnitsDropdown'
import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { getWeatherData } from './utils/weatherApi'

function App() {
  const [location, setLocation] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [units, setUnits] = useState('metric')
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)

  // Default location (London) on initial load
  useEffect(() => {
    loadDefaultLocation()
  }, [])

  const loadDefaultLocation = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherData(51.5074, -0.1278, units)
      setWeatherData(data)
      setLocation({ name: 'London', latitude: 51.5074, longitude: -0.1278 })
    } catch (err) {
      setError('Failed to load weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSelect = async (selectedLocation) => {
    setLoading(true)
    setError(null)
    setSelectedDayIndex(0)
    try {
      const data = await getWeatherData(
        selectedLocation.latitude,
        selectedLocation.longitude,
        units
      )
      setWeatherData(data)
      setLocation(selectedLocation)
    } catch (err) {
      setError('Failed to load weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleUnitsChange = async (newUnits) => {
    if (newUnits === units || !location) return
    
    setUnits(newUnits)
    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherData(
        location.latitude,
        location.longitude,
        newUnits
      )
      setWeatherData(data)
    } catch (err) {
      setError('Failed to update weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src="/assets/images/icon-loading.svg" alt="Loading" className="w-16 h-16 animate-spin" />
          <p className="text-neutral-300">Loading weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <img src="/assets/images/logo.svg" alt="Weather App" className="h-8" />
            <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-0">
              How's the sky looking today?
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar onLocationSelect={handleLocationSelect} />
            <UnitsDropdown units={units} onUnitsChange={handleUnitsChange} />
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center gap-3">
            <img src="/assets/images/icon-error.svg" alt="Error" className="w-6 h-6" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather - Takes full width on mobile, 1 column on desktop */}
            <div className="lg:col-span-1">
              <CurrentWeather
                weatherData={weatherData}
                location={location}
                units={units}
                loading={loading}
              />
            </div>

            {/* Forecasts - Takes full width on mobile, 2 columns on desktop */}
            <div className="lg:col-span-2 space-y-6">
              <DailyForecast
                weatherData={weatherData}
                units={units}
                selectedDayIndex={selectedDayIndex}
                onDaySelect={setSelectedDayIndex}
              />
              <HourlyForecast
                weatherData={weatherData}
                units={units}
                selectedDayIndex={selectedDayIndex}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

