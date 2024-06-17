const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload.toLowerCase();
        default:
            return state;
    }
};

export const changeFilter = (filter) => {
    return {
        type: 'FILTER',
        payload: filter,
    };
};

export default filterReducer;