// CheckoutPage.js
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setCartInfo} from '../../redux/slices/userSlice';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {FONTS, ROUTES} from '../../config';
import {Button} from '../../components';

const CheckoutPage = ({navigation}) => {
  const dispatch = useDispatch();
  const cartInfo = useSelector(state => state?.user?.cartInfo);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // Group items by restaurantName
  const groupedItems = {};
  cartInfo.forEach(item => {
    if (!groupedItems[item.restaurantName]) {
      groupedItems[item.restaurantName] = [];
    }
    groupedItems[item.restaurantName].push({
      name: item.name,
      price: item.price,
    });
  });

  const totalPrice = cartInfo.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
    setShowPaymentPopup(true);
    setTimeout(() => {
      dispatch(setCartInfo([]));
      setShowPaymentPopup(false);
      navigation.navigate(ROUTES.HOME);
    }, 3000);
  };

  return (
    <>
      <View style={styles.container}>
        {Object.keys(groupedItems).map(restaurantName => (
          <View key={restaurantName} style={styles.restaurantContainer}>
            <Text style={styles.restaurantTitle}>
              {`Restaurant : ${restaurantName}`}
            </Text>
            <View style={styles.itemContainer}>
              {groupedItems[restaurantName].map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>₹{item.price}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        <View>
          <View style={styles.row}>
            <Text style={styles.totalText}>Grand Total: </Text>
            <Text style={styles.totalText}>Grand Total: ₹{totalPrice}</Text>
          </View>
          <Button title="Make Payment" onPress={handlePayment} />
        </View>
      </View>
      {/* Payment success popup */}
      <Modal isVisible={showPaymentPopup}>
        <View style={styles.paymentPopup}>
          <LottieView
            source={require('../../assets/updateApp.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <Text style={styles.paymentPopupText}>Payment Successful!</Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  restaurantContainer: {
    marginBottom: 20,
  },
  restaurantTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
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
  text: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentPopupText: {
    fontSize: 18,
    fontFamily: FONTS.SEMIBOLD,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default CheckoutPage;
