import PropTypes from 'prop-types';

import ListItem from './ListItem';

const CountriesList = ({ data, buttonHandler }) => {
    if (data.length > 10 || data.length === 0) {
        return ( 
            data.length === 0 ? 
            <><p>No matches</p></> :
            <><p>Too many matches, use filter</p></>
        );
    }
  
    return (
        <>
            {data.map(c => <ListItem key={c} name={c} handler={buttonHandler} />)}
        </>
    );
};

CountriesList.propTypes = {
    data: PropTypes.array,
    buttonHandler: PropTypes.func,
};

export default CountriesList;