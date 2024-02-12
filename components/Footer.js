import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  AntDesign,
  Feather,
  EvilIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const Footer = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(null);
  const [cartArray, setCartArray] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  const [pressedIcons, setPressedIcons] = useState({
    Home: true,
    Notifications: false,
    Account: false,
    Cart: false,
  });

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        const authData = JSON.parse(value);
        setAuth(authData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveCart = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("@cart");
      if (storedValue !== null) {
        const cartData = JSON.parse(storedValue);
        const updatedCartWithoutEmpty = cartData.filter(
          (item) => Object.keys(item).length !== 0
        );

        setCartSize(updatedCartWithoutEmpty.length);
        setCartArray(updatedCartWithoutEmpty);
      } else {
        setCartSize(0);
        setCartArray([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveData();
    retrieveCart();
    handlePress()
  }, [cartArray, auth, cartSize , pressedIcons]);

  const handlePress = (icon) => {
    switch (icon) {
      case "Home":
        router.push("/(home)");
        setPressedIcons((prevState) => ({
          ...prevState,
          Home: true,
          Notifications: false, 
          Account: false,
          Cart: false,
        }));
        break;
      case "Notifications":
        router.push("notifications");
        setPressedIcons((prevState) => ({
          ...prevState,
          Home: false,
          Notifications: true,
          Account: false,
          Cart: false,
        }));
        break;
      case "Account":
        router.push("account");
        setPressedIcons((prevState) => ({
          ...prevState,
          Home: false,
          Notifications: false,
          Account: true,
          Cart: false,
        }));
        break;
      case "Cart":
        router.push("cart");
        setPressedIcons((prevState) => ({
          ...prevState,
          Home: false,
          Notifications: false,
          Account: false,
          Cart: true,
        }));
        break;
      default:
        break;
    }
  };
  

  const renderText = (text) => {
    return pressedIcons[text] ? (
      <Text style={styles.iconText}>{text}</Text>
    ) : null;
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => handlePress("Home")}
        style={
          pressedIcons.Home ? styles.bgiconContainer : styles.iconContainer
        }
      >
        <AntDesign
          name="home"
          size={24}
          color={pressedIcons.Home ? "#ffffff" : "black"}
        />
        {renderText("Home")}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("Notifications")}
        style={
          pressedIcons.Notifications
            ? { ...styles.bgiconContainer }
            : styles.iconContainer
        }
      >
        <Feather
          name="bell"
          size={24}
          color={pressedIcons.Notifications ? "#ffffff" : "black"}
        />
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationCount}>01</Text>
        </View>
        
          {renderText("Notifications")}
       
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress("Account")}
        style={
          pressedIcons.Account ? styles.bgiconContainer : styles.iconContainer
        }
      >
        <FontAwesome5
          name="user-circle"
          size={24}
          color={pressedIcons.Account ? "#ffffff" : "black"}
        />
        {renderText("Account")}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("Cart")}
        style={
          pressedIcons.Cart ? styles.bgiconContainer : styles.iconContainer
        }
      >
        <EvilIcons
          name="cart"
          size={24}
          color={pressedIcons.Cart ? "#ffffff" : "black"}
        />
        <View style={styles.notificationContainer}>
          <Text style={styles.Cart}>{cartSize}</Text>
        </View>
        {renderText("Cart")}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: -10,
    zIndex: 99,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bgiconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D8A144",
    flex: 1,
    padding: 15,
    borderRadius: 15,
  },
  notificationContainer: {
    position: "relative",
  },
  notificationCount: {
    fontSize: 9,
    padding: 3,
    fontWeight: "900",
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    position: "absolute",
    top: -20,
    right: -1,
  },
  Cart: {
    fontSize: 11,
    padding: 3,
    fontWeight: "bold",
    backgroundColor: "blue",
    color: "white",
    borderRadius: 10,
    position: "absolute",
    top: -20,
    right: -2,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffff",
    paddingLeft: 10,
  },
});

export default Footer;

// routing is correct but pressedIcons is not work