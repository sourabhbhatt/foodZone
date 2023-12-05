import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, FONTS, ROUTES} from '../config';
import Home from '../screens/home';
import RestaurantDetails from '../screens/restaurantDetails';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const mainStack = [
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
  ];
  return (
    <Stack.Navigator>
      {mainStack.map((item, index) => (
        <Stack.Screen
          name={item.label}
          component={item.component}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MainStack;
