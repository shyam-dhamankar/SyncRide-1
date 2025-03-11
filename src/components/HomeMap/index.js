import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import cars from "../../assets/data/cars";
import ExtraMarkers from "./extra";

const HomeMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    };

    fetchLocation();
  }, []);

  const getImage = (type) => {
    switch (type) {
      case "SyncRideX":
        return require("../../assets/images/SyncRideX.jpeg");
      case "SyncRideXL":
        return require("../../assets/images/SyncRideXL.jpeg");
      default:
        return require("../../assets/images/Comfort.jpeg");
    }
  };

  const renderCarMarker = ({ item }) => (
    <Marker
      coordinate={{
        latitude: item.latitude,
        longitude: item.longitude,
      }}
      title={item.type}
    >
      <Image source={getImage(item.type)} style={styles.carImage} />
    </Marker>
  );

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: 37.7749, // Fallback to San Francisco
                longitude: -122.4194,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
        }
      >
        {/* User's Current Location Marker */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}

        {/* Cars Markers using FlatList */}
       <ExtraMarkers/>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  carImage: {
    width: 40,
    height: 40,
  },
});

export default HomeMap;
