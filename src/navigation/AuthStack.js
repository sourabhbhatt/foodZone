import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../config';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const authStack = [
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
  ];

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {authStack.map((item, index) => (
        <Stack.Screen
          name={item.label}
          component={item.component}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
