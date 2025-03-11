import { FlatList, View, Pressable, Text, TouchableOpacity } from "react-native";
import UberType from "../UberType/ubertype";
import { types } from "../../assets/data/types";
import { db } from "../../../firebase_config"; // Ensure correct path
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useState } from "react";

const UberTypes = ({ pickUpLocation, dropLocation }) => {
  const [selectedType, setSelectedType] = useState(null);

  async function handlePress() {
    if (!pickUpLocation || !dropLocation || !selectedType) {
      console.log("Missing required fields!");
      return;
    }

    try {
      const rideRequest = {
        pickUpLocation,
        dropLocation,
        selectedType,
        status: "pending", // Default status
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "rideRequests"), rideRequest);
      console.log("Ride request added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding ride request:", error);
    }
  }

  return (
    <View>
      <FlatList
        data={types}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedType(item.type)}>
            <UberType typep={item} isSelected={selectedType === item.type} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable onPress={handlePress} style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            backgroundColor: selectedType ? "black" : "gray", // Disable if no type selected
            color: "white",
            padding: 15,
            margin: 10,
            textAlign: "center",
            width: "80%",
          }}
        >
          Share Ride Request
        </Text>
        <Fontisto name="taxi" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default UberTypes;
