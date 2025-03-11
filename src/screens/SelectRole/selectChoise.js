import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

const SelectChoise = () => {
  const navigation = useNavigation();

  const handleRoleSelection = (role) => {
    if (role === 'rider') {
      navigation.navigate('RiderSignUp', { role });
    } else if (role === 'driver') {
      navigation.navigate('DriverSignUp', { role });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <Text style={styles.sologen}>Select your role to continue</Text>
      {/* Rider Side  */}
      <TouchableOpacity style={styles.img} onPress={() => handleRoleSelection('rider')}>
        <Image
          style={{width:'90%',height:'100%',elevation:10}}
          source={require('../../assets/images/rider.jpeg')}
          resizeMode='contain'
        />
        <Text style={styles.text}>Rider </Text>
        <Text style={styles.sologen}>Book your first ride </Text>
      </TouchableOpacity>

      {/* Driver  */}
      <TouchableOpacity style={styles.img} onPress={() => handleRoleSelection('driver')}>
        <Image
          style={{width:'90%',height:'100%',elevation:10}}
          source={require('../../assets/images/cap.jpeg')}
          resizeMode='contain'
        />
        <Text style={styles.text}> Driver</Text>
        <Text style={styles.sologen}>Receive your ride captain</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectChoise;
