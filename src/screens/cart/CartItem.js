import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CartItem = ({item, onRemove}) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        style={styles.removeButton}>
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartItem;
