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

export default notificationSlice.reducer;