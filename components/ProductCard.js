// ProductCard.js

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, WillAddToCart, onAddToFavorites, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(product)}>
      <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 8 }}>
        <Image
          source={{ uri: product.thumbnail }} 
          style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{product.title}</Text>
        <Text style={{ color: 'gray', marginBottom: 8 }}>{product.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'green', fontWeight: 'bold' }}>{`$${product.price}`}</Text>
          <TouchableOpacity onPress={WillAddToCart} style={{ backgroundColor: 'green', borderRadius: 4, padding: 8 }}>
            <Text style={{ color: 'white' }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
