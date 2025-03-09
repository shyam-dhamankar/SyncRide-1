import { View, Dimensions } from 'react-native';
import React from 'react';
import GoMapsDirections from '../RouteMap.js';
import UberTypes from '../UberTypes/UberTypes';

const SearchResult = () => {
  return (
    <View>
      <View style={{ height: Dimensions.get('window').height - 500 }}>
        <GoMapsDirections origin={"20.954213367922367, 77.76719184284914"} destination={"20.950255691887673, 77.76566298375201"} />
      </View>
      <View >
      <UberTypes />
      </View>
    </View>
  );
};

export default SearchResult;