import { useState, useRef, useEffect } from 'react'
import { searchLocation } from '../utils/weatherApi'

function SearchBar({ onLocationSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const searchRef = useRef(null)
  const resultsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery)
    
    if (!searchQuery || searchQuery.trim().length === 0) {
      setResults([])
      setIsOpen(false)
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    
    try {
      const data = await searchLocation(searchQuery)
      setResults(data.results || [])
      setIsOpen(true)
    } catch (error) {
      setResults([])
      setIsOpen(false)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectLocation = (location) => {
    onLocationSelect({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
      admin1: location.admin1,
    })
    setQuery('')
    setResults([])
    setIsOpen(false)
    setHasSearched(false)
  }

  const getLocationDisplayName = (location) => {
    const parts = [location.name]
    if (location.admin1) parts.push(location.admin1)
    if (location.country) parts.push(location.country)
    return parts.join(', ')
  }

  return (
    <div className="relative w-full md:w-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a city, e.g., New York"
          className="w-full md:w-80 px-4 py-3 pl-12 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-0 placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <img
          src="/assets/images/icon-search.svg"
          alt="Search"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
        />
        {isSearching && (
          <img
            src="/assets/images/icon-loading.svg"
            alt="Searching"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin"
          />
        )}
      </div>

      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-2 bg-neutral-800 border border-neutral-600 rounded-lg shadow-xl max-h-64 overflow-y-auto"
        >
          {results.length === 0 && hasSearched && !isSearching ? (
            <div className="p-4 text-center text-neutral-300">
              <img
                src="/assets/images/icon-error.svg"
                alt="No results"
                className="w-8 h-8 mx-auto mb-2 opacity-50"
              />
              <p>No results found</p>
            </div>
          ) : (
            results.map((location, index) => (
              <button
                key={index}
                onClick={() => handleSelectLocation(location)}
                className="w-full px-4 py-3 text-left hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none transition-colors border-b border-neutral-700 last:border-b-0"
              >
                <p className="text-neutral-0 font-medium">
                  {getLocationDisplayName(location)}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar

