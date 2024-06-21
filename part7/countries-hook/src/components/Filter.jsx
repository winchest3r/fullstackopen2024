import PropTypes from 'prop-types';

const Filter = ({ text, handler }) => {
    return (
        <>
            Find countries <input value={text} onChange={handler} />
        </>
    );
};

Filter.propTypes = {
    text: PropTypes.string,
    handler: PropTypes.func,
};

export default Filter;