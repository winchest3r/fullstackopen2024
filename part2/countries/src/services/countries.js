import axios from 'axios'

const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAllCountries = () => {
    const request = axios.get(allCountriesUrl)
    return request.then(response => response.data)
};

const getCountryData = (countryName) => {
    const request = axios.get(`${countryUrl}/${countryName}`)
    return request.then(response => response.data)
}

export default { getAllCountries, getCountryData }