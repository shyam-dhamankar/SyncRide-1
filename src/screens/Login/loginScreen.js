import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../Authentication/LoginContext';

const LoginScreen = ({ navigation }) => {
    const { user, login, loading, error } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    await login(email, password);
  };

  // Log user role and navigate accordingly
  useEffect(() => {
    if (user) {
      if (user.role === 'driver') {
        navigation.navigate('DriverDashBoard');
      } else if (user.role === 'rider') {
        navigation.navigate('RiderDashBoard');
      } else {
        console.log("Invalid Role:", user.role);
        alert("Invalid Role");
      }
    }
  }, [user]);

  return (
    <View style={{ backgroundColor: '#4D55CC', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 40, color: 'white', marginTop: 30 }}>Welcome to SyncRide</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Login Screen</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
