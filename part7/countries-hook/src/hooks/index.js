import { useState, useEffect } from 'react';
import service from '../services/countries';

export const useCountry = () => {
  const [name, setName] = useState(null);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    if (name !== null) {
      service
        .getCountryData(name)
        .then(country => {
          service
            .getWeatherData(
              country.capitalInfo.latlng[0],
              country.capitalInfo.latlng[1]
            )
            .then(weather => {
              setData({
                name: country.name.common,
                area: country.area,
                languages: country.languages,
                capital: {
                  name: country.capital[0],
                  weather: {
                    icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
                    description: weather.weather[0].description,
                    temperature: weather.main.temp,
                    wind: weather.wind.speed,
                    humidity: weather.main.humidity,
                  },
                },
                flag: {
                  svg: country.flags.svg,
                  alt: country.flags.alt,
                },
              });
            });
        });
    } else {
      setData(null);
    }
  }, [name]);

  const change = (name) => setName(name);

  return {
    change,
    data
  };
};