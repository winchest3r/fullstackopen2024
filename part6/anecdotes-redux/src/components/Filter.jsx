import { useDispatch } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = () => {
    const dispatch = useDispatch();

    const handleFilter = (event) => {
        const value = event.target.value;
        dispatch(changeFilter(value));
    };

    return (
        <>
            filter
            <input name="filter" onChange={handleFilter} />
        </>
    );
};

export default Filter;