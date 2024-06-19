import { 
  useNotificationContextDispatch,
  useNotificationContextValue, 
} from "./NotificationContext";

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    };

    const notification = useNotificationContextValue();
    const dispatch = useNotificationContextDispatch();

    if (notification) {
      setTimeout(() => dispatch({ type: 'RST' }), 5000);
    }
  
    return (
      <>
        {notification ? <div style={style}>
            {notification}
          </div> : '' }
      </>
    );
}

export default Notification;