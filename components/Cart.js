import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    _retrieveData();

  }, [cartItems]);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@cart");
      if (value !== null) {
        const cartData = JSON.parse(value);
        setProducts(cartData);
        setCartItems(cartData);

        setCart(cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const cartString = await AsyncStorage.getItem("@cart");
      if (!cartString) {
        return;
      }
      let cart = JSON.parse(cartString);
      const updatedCart = cart.filter(
        (product) => product.productId !== productId
      );
  
      await AsyncStorage.setItem("@cart", JSON.stringify(updatedCart));
  
      console.log(
        `Product with productId ${productId} removed from cart successfully!`
      );
  
      // Update the cartItems state directly
      setCartItems(updatedCart);
  
      _retrieveData();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
  


  return (
    <ScrollView>
      <View style={styles.productContainer}>
        {cartItems
          .filter((item) => Object.keys(item).length !== 0)
          .map((p) => (
            <View key={p.productId} style={styles.productItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `https://dptf.onrender.com/api/v1/item/get-photo/${p.productId}`,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <ScrollView style={styles.productDetails}>
                <Text style={styles.productName}>{p.productName}</Text>
                <Text style={styles.productDescription}>{p.productDescription}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.Price}>&#x20B9; {p.productPrice * p.quantity}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Pressable
                    style={{
                      backgroundColor: p.schedule?.morning ? "red" : "white",
                      padding: 10,
                      borderWidth: p.schedule?.morning ? 0 : 1,
                      borderColor: "red",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: p.schedule?.morning || p.schedule?.evening ? "white" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {p.schedule?.morning && p.schedule?.evening
                        ? "morning and evening"
                        : p.schedule?.morning
                          ? "morning"
                          : p.schedule?.evening
                            ? "evening"
                            : "morning"}
                    </Text>

                  </Pressable>
                </View>

                <View style={styles.detailRow}>
                  <Text style={{ color: p.category === "veg" ? "green" : "red" }}>
                    {p.category}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontStyle: "italic", fontWeight: "800" }}>
                    {p.thaliType}
                  </Text>
                </View>
              </ScrollView>

              <Pressable
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderWidth: 0.5,
                  borderColor: "blue",
                  borderRadius: 5,
                  width: "80%",
                  marginHorizontal: "10%",
                  marginBottom: 20,
                }}
                onPress={() =>
                  handleRemove(p.productId)
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </Text>
              </Pressable>
            </View>
          ))}
      </View>

      {cartItems.length === 0 && (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Hello Guest</Text>
          <Text style={styles.emptyCartText}>Your Cart Is Empty</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    marginTop: 8, // Added margin top
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
  },
  checkoutButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  productContainer: {
    marginTop: 16,
    marginBottom: 20,
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center",
   flexWrap:"wrap"
  },
  productItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 6,
    backgroundColor: "white",
   
    minWidth:150,
    maxWidth:200,

  },
  imageContainer: {
    marginBottom: 8,
  },
  image: {
   
    height: 90,
    borderRadius: 8,
    paddingVertical: 20,
  },
  productDetails: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
    color: "green",
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 5,
    marginRight: 8,
    width: "30%",
  },
  quantityButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  quantityparent: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 8,
    width: "35%",
  },
  quantity: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    marginTop: 16,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  fixedButton: {
    position: "absolute",
    paddingVertical: 8,
    width: 90,
    backgroundColor: "green",
    borderRadius: 5,
    bottom: 40,
    right: 0,
    height: 40,
    alignItems: "center",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
  },
});

export default Cart;
