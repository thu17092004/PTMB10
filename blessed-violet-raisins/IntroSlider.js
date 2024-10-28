// IntroSlider.js
import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Chào mừng đến với ứng dụng',
    text: 'Anh1',
    image: require('./assets/anh1.jpg'), 
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Hãy trải nghiệm cùng tôi',
    text: 'Anh2',
    image: require('./assets/anh2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'Kết thúc',
    text: 'Anh3',
    image: require('./assets/anh3.png'),
    backgroundColor: '#22bcb5',
  },
];

export default function IntroSlider({ navigation }) {
  const [showMainApp, setShowMainApp] = useState(false);

  const _renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const _onDone = () => {
    setShowMainApp(true);
  };

  if (showMainApp) {
    navigation.replace('MainApp');
    return null;
  } else {
    return <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />;
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width,
    height: height * 0.7,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#fff',
  },
});
