// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const productList = [
  { id: 1, name: 'Sản phẩm 1', price: 100000, image: require('./assets/product1.jpg') },
  { id: 2, name: 'Sản phẩm 2', price: 150000, image: require('./assets/product2.jpg') },
  { id: 3, name: 'Sản phẩm 3', price: 200000, image: require('./assets/product3.jpg') },
];

export default function HomeScreen() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    let updatedCart = [...cartItems];
    const index = updatedCart.findIndex(item => item.id === product.id);
    
    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.centeredView}>
      <Text style={styles.screenTitle}>Home Screen</Text>
      {productList.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <Image source={product.image} style={styles.productImage} />
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price} VND</Text>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // Define your styles here
});
