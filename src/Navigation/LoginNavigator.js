import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/loginScreen';
import RiderDashboard from '../screens/RiderDashBoardScreen/RiderDashBoard';
import DriverDashboard from '../screens/DriverDashBoardScreen/DriverDashboard';    

const Stack = createStackNavigator();
const LoginNavigator = () => {
  return (
   
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="RiderDashBoard"
          component={RiderDashboard}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="DriverDashBoard"
          component={DriverDashboard}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
 
  );
};

export default LoginNavigator;