import Cart from '../../components/Cart';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../../components/auth/Login'
import CheckData from '../../components/auth/CheckData'
import { LinearGradient } from "expo-linear-gradient";
import Footer from '../../components/Footer';

const cart = () => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../img/c_logo.png")} />
          </View>

          <ScrollView style={{ zIndex: 1, marginVertical: 8, width: "90%" }}>
            <Cart />
            {/* <CheckData/> */}
          </ScrollView>

          <Footer />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
  
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    marginTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default cart;
