// CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        setCartItems(cart);
        calculateTotal(cart);
      }
    };

    loadCart();
  }, []);

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
    );

    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(total);
  };

  return (
    <View style={styles.centeredView}>
      <Text style={styles.screenTitle}>Giỏ Hàng</Text>
      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItemContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price} VND</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => updateQuantity(item, item.quantity - 1)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item, item.quantity + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Text style={styles.totalPrice}>Tổng cộng: {total} VND</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Define your styles here
});
