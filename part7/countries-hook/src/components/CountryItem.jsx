import PropTypes from 'prop-types';

const CountryItem = ({ country }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <p>capital {country.capital.name}<br />
            area {country.area}</p>
            <h3>languages:</h3>
            <ul>
            {Object.values(country.languages).map(
                l => <li key={l}>{l}</li>
            )}
            </ul>
            <img src={country.flag.svg} alt={country.flag.alt} width="25%" />
            <h3>Weather in {country.capital.name}</h3>
            <img 
            src={country.capital.weather.icon}
            alt={country.capital.weather.description}
            />
            <p>temperature {country.capital.weather.temperature} °C</p>
            <p>wind {country.capital.weather.wind} m/s</p>
            <p>humidity {country.capital.weather.humidity} %</p>
        </>
    );
};

CountryItem.propTypes = {
    country: PropTypes.shape({
        name: PropTypes.string,
        area: PropTypes.number,
        languages: PropTypes.object,
        capital: PropTypes.shape({
            name: PropTypes.string,
            weather: PropTypes.shape({
                icon: PropTypes.string,
                description: PropTypes.string,
                temperature: PropTypes.number,
                wind: PropTypes.number,
                humidity: PropTypes.number,
            }),
        }),
        flag: PropTypes.shape({
            svg: PropTypes.string,
            alt: PropTypes.string,
        }),
    })
}

export default CountryItem;