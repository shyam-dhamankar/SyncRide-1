import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import axios from "axios";

// Helper function to parse a "lat,lng" string into an object.
const parseCoordinate = (coordString) => {
  if (!coordString) return null;
  const [lat, lng] = coordString.split(",").map(Number);
  return { latitude: lat, longitude: lng };
};

const GoMapsDirections = ({ origin, destination }) => {
  // Check if props exist before processing
  if (!origin || !destination) {
    return <Text>Origin and destination are required.</Text>;
  }

  const originCoords = parseCoordinate(origin);
  const destinationCoords = parseCoordinate(destination);

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    fetchDirections(origin, destination);
  }, [origin, destination]);

  const fetchDirections = async (origin, destination) => {
    try {
      console.log("Fetching directions from:", origin, "to:", destination);
      const response = await axios.get(
        "https://maps.gomaps.pro/maps/api/directions/json",
        {
          params: {
            origin,
            destination,
            key: "AlzaSyeDdzHytdrRi7IZklw1cJrOlvkCwenAwlK",
          },
        }
      );

      console.log("API Response:", response.data);

      if (!response.data || response.data.routes.length === 0) {
        console.error("No routes found!");
        return;
      }

      const polylineString = response.data.routes[0]?.overview_polyline?.points;
      if (!polylineString) {
        console.error("Polyline not available!");
        return;
      }

      const points = decodePolyline(polylineString);
      console.log("Decoded Polyline Points:", points);
      setRouteCoordinates(points);
    } catch (error) {
      console.error(
        "Error fetching directions: ",
        error.response?.data || error.message
      );
    }
  };

  // Decodes the encoded polyline string to an array of { latitude, longitude } objects.
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: originCoords.latitude,
          longitude: originCoords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Red marker for Origin */}
        <Marker coordinate={originCoords} title="Origin" pinColor="red" />
        {/* Green marker for Destination */}
        <Marker
          coordinate={destinationCoords}
          title="Destination"
          pinColor="green"
        />
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"  // Polyline color (adjust if needed)
          />
        )}
      </MapView>
    </View>
  );
};

export default GoMapsDirections;
