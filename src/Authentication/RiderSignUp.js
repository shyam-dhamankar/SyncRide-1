import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { auth, db } from '../../firebase_config';
import { addDoc, collection } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const RiderSignUp = ({ navigation, route }) => {
  const { role } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prnNo, setPrnNo] = useState('');
  const [college, setCollege] = useState('');
  const [designation, setDesignation] = useState('');
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');

    if (!name || !email || !phone || phone.length !== 10 || !prnNo || !college || !designation || !branch) {
      setError('Please fill in all fields correctly');
      return;
    }

    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Add user details to Firestore
      await addDoc(collection(db, 'Rider'), {
        user: user.uid,
        name,
        email,
        phone: `+91${phone}`, // Adding +91 for India
        role,
        prnNo,
        college,
        designation,
        branch,
      });

      await addDoc(collection(db, 'users'), {
        user: user.uid,
        name,
        role,
        email,
      });

      Alert.alert('Success', 'Rider account created. Please verify your email.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error saving document: ', error);
      setError(error.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Rider Sign Up</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{ color: 'blue' }}>Already have an account? Click to login</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter Name" />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter email" keyboardType="email-address" />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Enter phone number" keyboardType="phone-pad" />

        <Text style={styles.label}>PRN Number:</Text>
        <TextInput style={styles.input} value={prnNo} onChangeText={setPrnNo} placeholder="Enter PRN number" keyboardType="numeric" />

        <Text style={styles.label}>College:</Text>
        <TextInput style={styles.input} value={college} onChangeText={setCollege} placeholder="Enter college name" />

        <Text style={styles.label}>Designation:</Text>
        <Picker selectedValue={designation} style={styles.picker} onValueChange={(itemValue) => setDesignation(itemValue)}>
          <Picker.Item label="Select Designation" value="" />
          <Picker.Item label="HOD" value="HOD" />
          <Picker.Item label="Staff" value="Staff" />
          <Picker.Item label="Faculty" value="Faculty" />
          <Picker.Item label="Student" value="Student" />
        </Picker>

        <Text style={styles.label}>Branch:</Text>
        <TextInput style={styles.input} value={branch} onChangeText={setBranch} placeholder="Enter branch" />

        <Text style={styles.label}>Password:</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />

        <Text style={styles.label}>Re-enter Password:</Text>
        <TextInput style={styles.input} value={rePassword} onChangeText={setRePassword} placeholder="Re-enter password" secureTextEntry />

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

export default RiderSignUp;
