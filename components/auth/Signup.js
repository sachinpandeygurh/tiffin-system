import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const route = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://dptf.onrender.com/api/v1/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res && res.data.success) {
        Alert.alert('Success', res.data.message);
        // await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(res?.data?.user?._id));
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        placeholder="Your Name"
      />

      <TextInput
        value={email.toLowerCase()}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder="Enter Your Email"
      />

      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="Your Password"
        secureTextEntry
      />

      <TextInput
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
      />

      <TextInput
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
        placeholder="Address"
      />

      <TextInput
        value={answer}
        onChangeText={(text) => setAnswer(text)}
        style={styles.input}
        placeholder="Favorite sports"
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

       <Text style={{marginTop:20}}>
        Existing User?{' '}
        <Text
          style={styles.linkText}
          onPress={() =>   route.push('login')}
        >
          Log in
        </Text>
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:100,
      flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minWidth:300
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: '#ffa502',
    borderRadius: 8,
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    // fontSize: 50, // Uncomment if you want to increase the font size
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'blue',
    letterSpacing: 1, // There's a typo here. It should be 'letterSpacing', not 'tEXTspace'
    //   paddingVertical: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});

export default Signup;
