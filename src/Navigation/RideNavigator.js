import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DestinationSearch from '../screens/Destenation/DestinationSearch.js';
import SearchResult from '../components/SearchResult/index';
import GoMapsDirections from '../components/RouteMap.js';
const Stack = createStackNavigator();

const RideNavigator = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="DestinationSearch"
          component={DestinationSearch}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="GoMapsDirections"
          component={GoMapsDirections}
          options={{
            headerShown: false
          }}
        />
        {/* Add other screens as needed */}
      </Stack.Navigator>

  );
};

export default RideNavigator;