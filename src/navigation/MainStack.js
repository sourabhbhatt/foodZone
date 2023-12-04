import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_ARRAYS} from '../config';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {SCREEN_ARRAYS.MAIN_STACK.map((item, index) => (
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
