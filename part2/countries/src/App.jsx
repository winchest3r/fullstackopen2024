import { useState, useEffect } from 'react'
import service from './services/countries'

const Filter = ({ text, handler }) => {
  return (
    <>
      Find countries <input value={text} onChange={handler} />
    </>
  )
}

const ListItem = ({ name, handler }) => {
  return (
    <>
      <p>{name} <button onClick={handler(name)}>show</button></p>
    </>
  )
}

const CountryItem = ({ country, weather }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}<br />
      area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(
          l => <li key={l}>{l}</li>
        )}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width="25%" />
      <h3>Weather in {country.capital}</h3>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
        alt={weather.weather[0].description}
      />
      <p>temperature {weather.main.temp} °C</p>
      <p>wind {weather.wind.speed} m/s</p>
      <p>humidity {weather.main.humidity} %</p>
    </>
  )
}

const CountriesList = ({ data, buttonHandler }) => {
  if (data.length > 10 || data.length === 0) {
    return ( 
      data.length === 0 ? 
      <><p>No matches</p></> :
      <><p>Too many matches, use filter</p></>
    )
  }

  return (
    <>
      {data.map(c => <ListItem key={c} name={c} handler={buttonHandler} />)}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filterText, setFilterText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState({})
  const [currentWeather, setCurrentWeather] = useState({})

  useEffect(() => {
    service
      .getAllCountries()
      .then(data => {
        const list = data.map(entry => entry.name.common);
        list.sort()
        setCountries(list)
        setFilteredCountries(list)
      })
  }, [])

  const filterHandler = (event) => {
    const text = event.target.value;
    const newList = countries.filter(
      c => c.toLowerCase().includes(text.toLowerCase())
    )
    if (newList.length === 1) {
      // get country data only once if filter shows the same
      if (newList[0] === filteredCountries[0]) {
        setFilterText(text)
      } else {
        service
          .getCountryData(newList[0])
          .then(data => {
            service
              .getWeatherData(data.capitalInfo.latlng[0], data.capitalInfo.latlng[1])
              .then(weather => {
                setCurrentCountry(data)
                setCurrentWeather(weather)
                setFilterText(text);
                setFilteredCountries(newList);
              })
          })
      }
    } else {
      setCurrentCountry({})
      setFilterText(text);
      setFilteredCountries(newList);
    }
  };

  const buttonHandler = (selectedCountry) => () => {
    service
      .getCountryData(selectedCountry)
      .then(data => {
        setCurrentCountry(data)
        setFilterText(selectedCountry)
        setFilteredCountries([selectedCountry])
      })
  }

  if (!countries) {
    return (
      <>
        <div className='header'>
          <h1>Data for countries</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='header'>
        <h1>Data for countries</h1>
      </div>
      <div className='content'>
        <Filter text={filterText} handler={filterHandler}/>
        {
          filteredCountries.length === 1 ? 
          <CountryItem country={currentCountry} weather={currentWeather} /> :
          <CountriesList data={filteredCountries} buttonHandler={buttonHandler} />
        }
      </div>
    </>
  )
}

export default App