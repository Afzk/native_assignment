import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CartScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 16 }}>
      <Text>Cart Screen</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;