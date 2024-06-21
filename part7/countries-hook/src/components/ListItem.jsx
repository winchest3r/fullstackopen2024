import PropTypes from 'prop-types';

const ListItem = ({ name, handler }) => {
    return (
        <>
            <p>{name} <button onClick={handler(name)}>show</button></p>
        </>
    );
};

ListItem.propTypes = {
    name: PropTypes.string,
    handler: PropTypes.func,
};

export default ListItem;