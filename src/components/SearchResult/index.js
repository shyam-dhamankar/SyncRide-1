import { View, Dimensions } from 'react-native';
import React from 'react';
import HomeMap from '../HomeMap/index';
import UberTypes from '../UberTypes/UberTypes';

const SearchResult = () => {
  return (
    <View>
      <View style={{ height: Dimensions.get('window').height - 500 }}>
        <HomeMap />
      </View>
      <View >
      <UberTypes />
      </View>
    </View>
  );
};

export default SearchResult;