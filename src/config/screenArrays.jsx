import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
import Home from '../screens/home';
import RestaurantDetails from '../screens/restaurantDetails';
import COLORS from './colors';
import FONTS from './fonts';
import ROUTES from './routes';

const SCREEN_ARRAYS = {
  AUTH: [
    {
      route: ROUTES.LOGIN,
      label: ROUTES.LOGIN,
      component: Login,
      headerShown: false,
    },
    {
      route: ROUTES.REGISTER,
      label: ROUTES.REGISTER,
      component: Signup,
      headerShown: false,
    },
  ],

  MAIN_STACK: [
    {
      route: ROUTES.HOME,
      label: ROUTES.HOME,
      component: Home,
      options: {
        title: 'Food Zone',
        headerTitleStyle: {
          fontFamily: FONTS.SEMIBOLD_ITALIC,
          fontSize: 20,
          color: COLORS.PRIMARY,
        },
      },
    },
    {
      route: ROUTES.RESTAURANT_DETAILS,
      label: ROUTES.RESTAURANT_DETAILS,
      component: RestaurantDetails,
      options: {title: 'Restaurant Details'},
    },
    {
      route: ROUTES.CART,
      label: ROUTES.CART,
      component: Cart,
      options: {title: 'Cart'},
    },
    {
      route: ROUTES.CHECKOUT,
      label: ROUTES.CHECKOUT,
      component: Checkout,
      options: {title: 'Checkout'},
    },
  ],
};

export default SCREEN_ARRAYS;
