import { View, Dimensions } from "react-native";
import React from "react";
import HomeMap from "../../components/HomeMap/index.js";
import CovidMassage from "../../components/HoliMassageComponent/index.js";
import HomeSearch from "../../components/HomeSearch";
import { withNavigation } from '@react-navigation/compat';


const HomeScreen = () => {
  return (
    <View > 
      <View style={{ height: Dimensions.get("window").height - 450  }}>
          <HomeMap />
      </View>
      <View style={{position:'absolute',top:Dimensions.get("window").height - 450 }}>
        <CovidMassage />
        <HomeSearch />
      </View>
    </View>
  );
};

export default HomeScreen;
