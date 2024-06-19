import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        changeNotification: (state, action) => action.payload,
        hideNotification: (state, action) => '',
    },
});

export const { changeNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, seconds = 3) => {
    return dispatch => {
        dispatch(changeNotification(message));
        if (message) {
            setTimeout(() => {
              dispatch(hideNotification());
            }, seconds * 1000);
        }
    };
}

export default notificationSlice.reducer;