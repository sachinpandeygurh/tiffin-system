import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Login from '../../components/auth/Login'
import CheckData from '../../components/auth/CheckData'
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../img/c_logo.png")} />
          </View>

          <ScrollView style={{ zIndex: 1, marginVertical: 8 }}>
            <Login />
            {/* <CheckData/> */}
          </ScrollView>

          {/* <Footer /> */}
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

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
  
    marginTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
