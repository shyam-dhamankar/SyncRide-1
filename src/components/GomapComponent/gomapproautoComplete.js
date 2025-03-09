import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";

const AutocompleteScreen = ({ setFromText, setLocation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // API Key (Ensure this is valid)
 const API_KEY = "AlzaSyeDdzHytdrRi7IZklw1cJrOlvkCwenAwlK";

  // Fetch autocomplete predictions
  const fetchPredictions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.predictions) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  // Fetch place details (to get latitude and longitude)
  const fetchPlaceDetails = async (placeId) => {
    try {
      const url = `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.result && data.result.geometry) {
        const { lat, lng } = data.result.geometry.location;
        setLocation({ latitude: lat, longitude: lng });
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      {/* Text Input for Autocomplete Search */}
      <TextInput
        placeholder="Enter location..."
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          borderColor: "#ccc",
          marginBottom: 10,
        }}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          fetchPredictions(text);
        }}
      />

      {/* List of Location Suggestions */}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
            onPress={() => {
              setQuery(item.description); // Update input with selected location
              setFromText(item.description); // Pass location to parent
              fetchPlaceDetails(item.place_id); // Fetch lat & lng
              setSuggestions([]); // Clear suggestions
            }}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AutocompleteScreen;
