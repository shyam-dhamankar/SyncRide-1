import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './style';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { withNavigation } from '@react-navigation/compat';

const HomeSearch = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('DestinationSearch')} style={styles.inputContainer}>
        <Text style={styles.inputtext}>Where To ?</Text>
        <View style={styles.timecontiner}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text>Now</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.iconcontainer}>
          <AntDesign name="clockcircle" color={'white'} size={16} />
        </View>
        <Text style={styles.destination}>spin night club</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.iconcontainerhome}>
          <FontAwesome name="home" color={'white'} size={16} />
        </View>
        <Text style={styles.destination}>spin night club</Text>
      </View>
    </View>
  );
};

export default withNavigation(HomeSearch);