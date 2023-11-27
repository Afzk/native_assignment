import React from 'react';
import { ScrollView, Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper/src';
import 'setimmediate';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={{ padding: 16, marginBottom: '10%' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{product.title}</Text>

      <Swiper style={{ height: 200, marginBottom: 16 }} autoplay autoplayTimeout={5}>
        {product.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ flex: 1 }} />
        ))}
      </Swiper>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        ${product.price}
      </Text>

      <View style={styles.buttonContainer }>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={[styles.button, { backgroundColor: 'lightblue' }]}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
          style={[styles.button, { backgroundColor: 'green' }]}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 25 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>Details</Text>
      <Text style={{ fontSize: 15, marginBottom: 300 }}>{product.description}</Text>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          height: '10%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: 'gray',
          marginBottom: 0
        }}
      >
        <TouchableOpacity onPress={handleHomePress}>
          <View style={{ alignItems: 'center' }}>
            <Text>&#x1F3E0;</Text>
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <View style={{ alignItems: 'center' }}>
            <Text>&#x1F4E6;</Text>
            <Text>Categories</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <View style={{ alignItems: 'center' }}>
            <Text>&#x2B50;</Text>
            <Text>Favorites</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('More')}>
          <View style={{ alignItems: 'center' }}>
            <Text>&#x2699;</Text>
            <Text>More</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
  },
});

export default ProductDetailsScreen;
