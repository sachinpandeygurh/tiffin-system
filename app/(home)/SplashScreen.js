import React, { useEffect } from "react";
import { StyleSheet, View, Pressable, Text, Animated } from "react-native";
import { useRouter } from "expo-router";
import { SimpleFilter } from 'react-native-image-filter-kit';

export default function SplashScreen({ navigation }) {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => {
      router.push('(home)');
    });
  }, [fadeAnim, navigation]);

  const handlePress = () => {
    // Handle press logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to</Text>
        </View>
        <Pressable style={styles.logoPressable} onPress={handlePress}>
          <Animated.View style={{ ...styles.logo, opacity: fadeAnim }}>
            <SimpleFilter
              onFilter={(source) => source.map((pixel) => [pixel[0], pixel[1], pixel[2], 1])}
            >
              <Animated.Image
                style={styles.logoImage}
                source={require('../../img/c_logo.png')}
              />
            </SimpleFilter>
          </Animated.View>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> MCS Tiffin Services</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoPressable: {
    borderRadius: 50,
    overflow: 'hidden', // Use 'hidden' instead of ViewPropTypes.style
  },
  logo: {
    width: 300,
    height: 300,
    backgroundColor: 'black', 
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginVertical: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333f",
  },
});
