import axios from 'axios';

const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/';

const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';

const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

const getAllCountries = async () => {
    const response = await axios.get(allCountriesUrl);
    return response.data;
};

const getCountryData = async (countryName) => {
    const response = await axios.get(`${countryUrl}/${countryName}`);
    return response.data;
};

const getWeatherData = async (latitude, longitude) => {
    const url = openWeatherMapUrl +
        `?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
};

export default { getAllCountries, getCountryData, getWeatherData };