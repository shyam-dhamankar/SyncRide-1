import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectChoise from '../screens/SelectRole/selectChoise.js';
import RiderSignUp from '../Authentication/RiderSignUp.js';
import DriverSignUp from '../Authentication/DriverSignUp.js';
import LoginNavigator from './LoginNavigator.js';

const Stack = createStackNavigator();
const SigupNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'SelectRole'}
          component={SelectChoise}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={'RiderSignUp'}
          component={RiderSignUp}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={'DriverSignUp'}
          component={DriverSignUp}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={'LoginScreen'}
          component={LoginNavigator}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SigupNavigator;