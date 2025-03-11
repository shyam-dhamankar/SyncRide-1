import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from '../../firebase_config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const DriverSignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role] = useState('driver');
  const [prnNo, setPrnNo] = useState('');
  const [college, setCollege] = useState('');
  const [designation, setDesignation] = useState('');
  const [branch, setBranch] = useState('');

  const [licenseNo, setLicenseNo] = useState('');
  const [vehicleRegNo, setVehicleRegNo] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [password, setPassword] = useState('');
  const [Repassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError(''); // Clear previous error
    if (password !== Repassword) {
      setError('Password does not match');
      return;
    }
    if (!email || !password || !phone || !prnNo || !college || !designation || !branch || !licenseNo || !vehicleRegNo || !vehicleType || !vehicleNo || !vehicleColor) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user) {
        setError('Your email is already registered');
        return;
      }
      await addDoc(collection(db, 'drivers'), {
        user: user.uid,
        name,
        email,
        phone,
        role,
        prnNo,
        college,
        designation,
        branch,
        vehicle: {
          licenseNo,
          vehicleRegNo,
          vehicleType,
          vehicleNo,
          vehicleColor
        }
      });

      await addDoc(collection(db, 'users'), {
        user: user.uid,
        name,
        role,
        email,
      });

      Alert.alert('Success', 'Driver account created');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error saving document: ', error);
      setError('An error occurred while saving the data');
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Driver Sign Up</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{ color: 'blue' }}>if you have already account click to login</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        <Text style={styles.label}>Repeat Password:</Text>
        <TextInput
          style={styles.input}
          value={Repassword}
          onChangeText={setRePassword}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>PRN Number:</Text>
        <TextInput
          style={styles.input}
          value={prnNo}
          onChangeText={setPrnNo}
          placeholder="Enter PRN number"
          keyboardType="numeric"
        />
        <Text style={styles.label}>College:</Text>
        <TextInput
          style={styles.input}
          value={college}
          onChangeText={setCollege}
          placeholder="Enter college name"
        />
        <Text style={styles.label}>Designation:</Text>
        <Picker
          selectedValue={designation}
          style={styles.picker}
          onValueChange={(itemValue) => setDesignation(itemValue)}
        >
          <Picker.Item label="Select Designation" value="" key="default" />
          <Picker.Item label="HOD" value="HOD" key="hod" />
          <Picker.Item label="Staff" value="Staff" key="staff" />
          <Picker.Item label="Faculty" value="Faculty" key="faculty" />
          <Picker.Item label="Student" value="Student" key="student" />
        </Picker>
        <Text style={styles.label}>Branch:</Text>
        <TextInput
          style={styles.input}
          value={branch}
          onChangeText={setBranch}
          placeholder="Enter branch"
        />
        {/* Vehicle Information Section */}
        <Text style={styles.title}>Vehicle Details</Text>
        <Text style={styles.label}>License Number:</Text>
        <TextInput
          style={styles.input}
          value={licenseNo}
          onChangeText={setLicenseNo}
          placeholder="Enter License Number"
        />
        <Text style={styles.label}>Vehicle Registration Number:</Text>
        <TextInput
          style={styles.input}
          value={vehicleRegNo}
          onChangeText={setVehicleRegNo}
          placeholder="Enter Vehicle Registration Number"
        />
        <Text style={styles.label}>Vehicle Type:</Text>
        <Picker
          selectedValue={vehicleType}
          style={styles.picker}
          onValueChange={(itemValue) => setVehicleType(itemValue)}
        >
          <Picker.Item label="Select Vehicle Type" value="" key="default" />
          <Picker.Item label="Bike" value="Bike" key="bike" />
          <Picker.Item label="SyncRideX" value="SyncRideX" key="SyncRideX" />
          <Picker.Item label="SyncRideXL" value="SyncRideXL" key="SyncRideXL" />
          <Picker.Item label="comfort" value="comfort" key="comfort" />
        </Picker>
        <Text style={styles.label}>Vehicle Number:</Text>
        <TextInput
          style={styles.input}
          value={vehicleNo}
          onChangeText={setVehicleNo}
          placeholder="Enter Vehicle Number"
        />
        <Text style={styles.label}>Vehicle Color:</Text>
        <TextInput
          style={styles.input}
          value={vehicleColor}
          onChangeText={setVehicleColor}
          placeholder="Enter Vehicle Color"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
});

export default DriverSignUp;