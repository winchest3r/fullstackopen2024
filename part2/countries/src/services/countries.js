import axios from 'axios'

const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather'

const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY

const getAllCountries = () => {
    const request = axios.get(allCountriesUrl)
    return request.then(response => response.data)
};

const getCountryData = (countryName) => {
    const request = axios.get(`${countryUrl}/${countryName}`)
    return request.then(response => response.data)
}

const getWeatherData = (latitude, longitude) => {
    const url = openWeatherMapUrl +
        `?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { getAllCountries, getCountryData, getWeatherData }