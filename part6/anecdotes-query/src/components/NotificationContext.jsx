import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'MSG': 
            return action.payload;
        case 'RST': {
            return '';
        }
        default:
            return state;
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '');

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export const useNotificationContextValue = () => {
    const result = useContext(NotificationContext);
    return result[0];
}

export const useNotificationContextDispatch = () => {
    const result = useContext(NotificationContext);
    return result[1];
}

export default NotificationContext;