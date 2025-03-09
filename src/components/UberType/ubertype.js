import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./style";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Ionicons } from "@expo/vector-icons";

const UberType = ({ typep }) => {
  function getImage() {
    if (typep.type === "UberX") {
      return require("../../assets/images/UberX.jpeg");
    } else if (typep.type === "UberXL") {
      return require("../../assets/images/UberXL.jpeg");
    } else {
      return require("../../assets/images/Comfort.jpeg");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.images}
        source={getImage()}
      />
      <View style={styles.sContainer}>
        <Text style={styles.types}>
          {typep.type}
          <Ionicons name="person" size={19} color={"black"} />
          {" "}{typep.seats}
        </Text>
        <View>
          <Text style={styles.time}>{typep.duration} pm drop off</Text>
        </View>
      </View>
      <View style={styles.tContainer}>
        <FontAwesome6 name="money-bill-trend-up" size={18} color="green" />
        <Text style={{ fontSize: 16, marginHorizontal: 0.2 }}> {typep.price}💲.Est</Text>
      </View>
      
    </View>
  );
};

export default UberType;
