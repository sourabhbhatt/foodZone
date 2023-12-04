// CheckoutPage.js
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartInfo = useSelector(state => state?.user?.cartInfo);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // Group items by restaurantId
  const groupedItems = {};
  cartInfo.forEach(item => {
    if (!groupedItems[item.restaurantId]) {
      groupedItems[item.restaurantId] = [];
    }
    groupedItems[item.restaurantId].push({name: item.name, price: item.price});
  });

  // Calculate total price
  const totalPrice = cartInfo.reduce((total, item) => total + item.price, 0);

  // Function to handle payment
  const handlePayment = () => {
    // Show payment success popup
    setShowPaymentPopup(true);

    // Dispatch an action to remove data from Redux
    // dispatch({type: 'REMOVE_CART_ITEMS'}); // Replace 'REMOVE_CART_ITEMS' with your actual action type
  };

  return (
    <View style={styles.container}>
      {Object.keys(groupedItems).map(restaurantId => (
        <View key={restaurantId} style={styles.restaurantContainer}>
          <Text style={styles.restaurantTitle}>
            Restaurant ID: {restaurantId}
          </Text>
          <View style={styles.itemContainer}>
            {groupedItems[restaurantId].map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Grand total */}
      <Text style={styles.totalText}>Grand Total: ${totalPrice}</Text>

      {/* Make payment button */}
      <View style={styles.buttonContainer}>
        <Button title="Make Payment" onPress={handlePayment} />
      </View>

      {/* Payment success popup */}
      {showPaymentPopup && (
        <View style={styles.paymentPopup}>
          <Text>Payment Successful!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  restaurantContainer: {
    marginBottom: 20,
  },
  restaurantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paymentPopup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    transform: [{translateX: -50}, {translateY: -50}],
  },
});

export default CheckoutPage;
