import { View, Dimensions } from 'react-native';
import React from 'react';
import GoMapsDirections from '../RouteMap.js';
import UberTypes from '../UberTypes/UberTypes';

const SearchResult = ({navigation,route}) => {
  const { PickUp, DropLocation } = route.params;
  console.log(route.params)
  return (
    <View>
      <View style={{ height: Dimensions.get('window').height - 500 }}>
      <GoMapsDirections origin={`${PickUp.latitude},${PickUp.longitude}`} destination={`${DropLocation.latitude},${DropLocation.longitude}`} />
      </View>
      <View >
      <UberTypes pickUpLocation={PickUp} dropLocation={DropLocation}/>
      </View>
    </View>
  );
};

export default SearchResult;