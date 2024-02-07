import { StyleSheet, Text, View, ScrollView, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import CheckData from '../../components/auth/CheckData'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LocationComponent from "../../components/Location";
import Carusel from "../../components/Carusel";
import Categoury from "../../components/Categoury";
import SubCategoury from "../../components/SubCategoury";
import Products from "../../components/Products";
const index = () => {
    const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <Header />
      <ScrollView style={{zIndex:1, marginVertical:80}}>
        <LocationComponent />
        {/* <CheckData/> */}
        {/* <Carusel />
        <Categoury />
        <SubCategoury />
        <Products/> */}
      </ScrollView>
        <Footer />
    </LinearGradient>
  </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
