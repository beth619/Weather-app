// Open-Meteo API integration
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export async function searchLocation(query) {
  if (!query || query.trim().length === 0) {
    return { results: [] };
  }

  try {
    const response = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
}

export async function getWeatherData(latitude, longitude, units = 'metric') {
  const temperatureUnit = units === 'imperial' ? 'fahrenheit' : 'celsius';
  const windSpeedUnit = units === 'imperial' ? 'mph' : 'kmh';
  const precipitationUnit = units === 'imperial' ? 'inch' : 'mm';

  try {
    const response = await fetch(
      `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${temperatureUnit}&windspeed_unit=${windSpeedUnit}&precipitation_unit=${precipitationUnit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export function getWeatherIcon(weatherCode, isDay = true) {
  // Weather code mapping based on WMO Weather interpretation codes
  const iconMap = {
    0: 'sunny', // Clear sky
    1: 'partly-cloudy', // Mainly clear
    2: 'partly-cloudy', // Partly cloudy
    3: 'overcast', // Overcast
    45: 'fog', // Fog
    48: 'fog', // Depositing rime fog
    51: 'drizzle', // Light drizzle
    53: 'drizzle', // Moderate drizzle
    55: 'drizzle', // Dense drizzle
    56: 'drizzle', // Light freezing drizzle
    57: 'drizzle', // Dense freezing drizzle
    61: 'rain', // Slight rain
    63: 'rain', // Moderate rain
    65: 'rain', // Heavy rain
    66: 'rain', // Light freezing rain
    67: 'rain', // Heavy freezing rain
    71: 'snow', // Slight snow fall
    73: 'snow', // Moderate snow fall
    75: 'snow', // Heavy snow fall
    77: 'snow', // Snow grains
    80: 'rain', // Slight rain showers
    81: 'rain', // Moderate rain showers
    82: 'rain', // Violent rain showers
    85: 'snow', // Slight snow showers
    86: 'snow', // Heavy snow showers
    95: 'storm', // Thunderstorm
    96: 'storm', // Thunderstorm with slight hail
    99: 'storm', // Thunderstorm with heavy hail
  };

  return iconMap[weatherCode] || 'sunny';
}

