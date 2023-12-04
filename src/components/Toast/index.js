import {setToastContent} from '../../redux/slices/appSlice';
import {store} from '../../redux/store';

export function showToastMessage({
  message,
  type,
  statusCode,
  description,
  action,
  image, // uri only
  duration = 5000, // this function will unmount based on this duration
  toastStyles = {},
}) {
  store.dispatch(
    setToastContent({
      message,
      type,
      statusCode,
      description,
      action,
      image,
      duration,
      toastStyles,
    }),
  );
  const timer = setTimeout(() => {
    store.dispatch(
      setToastContent({
        message: '',
        type: '',
        statusCode: '',
        description: '',
        action: {},
        image: null,
        duration: 0,
        toastStyles: {},
      }),
    );
  }, duration);
  return () => clearTimeout(timer);
}
