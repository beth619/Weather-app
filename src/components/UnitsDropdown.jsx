import { useState, useRef, useEffect } from 'react'

function UnitsDropdown({ units, onUnitsChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleUnitChange = (newUnits) => {
    onUnitsChange(newUnits)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-0 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        aria-label="Units dropdown"
      >
        <span>Units</span>
        <img
          src="/assets/images/icon-dropdown.svg"
          alt=""
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-64 bg-neutral-800 border border-neutral-600 rounded-lg shadow-xl overflow-hidden">
          <div className="p-3 border-b border-neutral-700">
            <p className="text-sm text-neutral-300 font-medium">
              Switch to {units === 'metric' ? 'Imperial' : 'Metric'}
            </p>
          </div>
          
          <div className="p-3 space-y-4">
            <div>
              <p className="text-sm text-neutral-300 mb-2 font-medium">Temperature</p>
              <div className="space-y-1">
                <button
                  onClick={() => handleUnitChange('metric')}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none transition-colors ${
                    units === 'metric' ? 'bg-neutral-700 text-orange-500' : 'text-neutral-0'
                  }`}
                >
                  Celsius (°C)
                </button>
                <button
                  onClick={() => handleUnitChange('imperial')}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none transition-colors ${
                    units === 'imperial' ? 'bg-neutral-700 text-orange-500' : 'text-neutral-0'
                  }`}
                >
                  Fahrenheit (°F)
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-300 mb-2 font-medium">Wind Speed</p>
              <div className="space-y-1">
                <button
                  onClick={() => handleUnitChange('metric')}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none transition-colors ${
                    units === 'metric' ? 'bg-neutral-700 text-orange-500' : 'text-neutral-0'
                  }`}
                >
                  km/h
                </button>
                <button
                  onClick={() => handleUnitChange('imperial')}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none transition-colors ${
                    units === 'imperial' ? 'bg-neutral-700 text-orange-500' : 'text-neutral-0'
                  }`}
                >
                  mph
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-300 mb-2 font-medium">Precipitation</p>
              <div className="space-y-1">
                <button
                  onClick={() => handleUnitChange('metric')}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none transition-colors ${
                    units === 'metric' ? 'bg-neutral-700 text-orange-500' : 'text-neutral-0'
                  }`}
                >
                  Millimeters (mm)
                </button>
                <button
                  onClick={() => handleUnitChange('imperial')}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none transition-colors ${
                    units === 'imperial' ? 'bg-neutral-700 text-orange-500' : 'text-neutral-0'
                  }`}
                >
                  Inches (in)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UnitsDropdown

