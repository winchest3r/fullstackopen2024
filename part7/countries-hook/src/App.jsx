import { useState, useEffect } from 'react';
import service from './services/countries';
import { useCountry } from './hooks';

import Filter from './components/Filter';
import CountryItem from './components/CountryItem';
import CountriesList from './components/CountriesList';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  const country = useCountry();

  useEffect(() => {
    service
      .getAllCountries()
      .then(data => {
        const list = data.map(entry => entry.name.common);
        list.sort()
        setCountries(list)
        setFilteredCountries(list)
      });
  }, []);

  const filterHandler = (event) => {
    const text = event.target.value;
    const newList = countries.filter(
      c => c.toLowerCase().includes(text.toLowerCase())
    );
    if (newList.length === 1) {
      // get country data only once if filter shows the same
      if (newList[0] === filteredCountries[0]) {
        setFilterText(text);
      } else {
        country.change(newList[0]);
        setFilterText(text);
      }
    } else {
      country.change(null);
      setFilterText(text);
      setFilteredCountries(newList);
    }
  };

  const buttonHandler = (selectedCountry) => () => {
    country.change(selectedCountry);
  };

  if (!countries) {
    return (
      <>
        <div className='header'>
          <h1>Data for countries</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='header'>
        <h1>Data for countries</h1>
      </div>
      <div className='content'>
        <Filter text={filterText} handler={filterHandler}/>
        {
          country.data ? 
          <CountryItem country={country.data} /> :
          <CountriesList data={filteredCountries} buttonHandler={buttonHandler} />
        }
      </div>
    </>
  );
};

export default App;