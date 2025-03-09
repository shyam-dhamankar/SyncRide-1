import { View, Dimensions } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import DestinationSearch from "./src/screens/Destenation/DestinationSearch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchResult from "./src/components/SearchResult";
import GoMapsProDirection from "./src/components/RouteMap.js";


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView >
        <HomeScreen />
        {/* <DestinationSearch /> */}
        {/* <SearchResult /> */}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
