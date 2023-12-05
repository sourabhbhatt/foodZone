import React from 'react';
import CartItem from './CartItem';
import {Button} from '../../components';
import {COLORS, FONTS, ROUTES} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setCartInfo} from '../../redux/slices/userSlice';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartInfo = useSelector(state => state?.user?.cartInfo);

  const getTotalPrice = () => {
    if (!cartInfo?.length) return 0;
    return cartInfo?.reduce(
      (total, item) => total + item?.price * item?.quantity,
      0,
    );
  };

  const onRemove = item => {
    const newCartInfo = cartInfo.filter(cartItem => cartItem.id !== item.id);
    dispatch(setCartInfo(newCartInfo));
  };

  const incrementQuantity = item => {
    const currentItem = cartInfo?.find(e => e?.id === item?.id);
    if (!currentItem) return;
    let updatedItem = {...currentItem};
    updatedItem.quantity = updatedItem.quantity + 1;
    const newCartInfo = cartInfo.map(e =>
      e.id === item?.id ? updatedItem : e,
    );
    dispatch(setCartInfo(newCartInfo));
  };

  const decrementQuantity = item => {
    if (item?.quantity === 1) {
      onRemove(item);
      return;
    }
    const currentItem = cartInfo?.find(e => e?.id === item?.id);
    if (!currentItem) return;
    let updatedItem = {...currentItem};
    updatedItem.quantity = updatedItem.quantity - 1;
    const newCartInfo = cartInfo.map(e =>
      e.id === item?.id ? updatedItem : e,
    );
    dispatch(setCartInfo(newCartInfo));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartInfo}
        keyExtractor={(it, i) => i.toString()}
        renderItem={({item, index}) => (
          <CartItem
            item={item}
            index={index}
            onRemove={onRemove}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
          />
        )}
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={
          <Text style={styles.noData}>{'No items in cart'}</Text>
        }
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalPrice}>
          {`Total: ₹${getTotalPrice().toFixed(2)}`}
        </Text>
        <Button
          title={'Checkout'}
          onPress={() => navigation.navigate(ROUTES.CHECKOUT)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  cartList: {paddingBottom: 20},

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
  },

  totalPrice: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.BLACK,
  },

  noData: {
    textAlign: 'center',
    fontFamily: FONTS.MEDIUM,
    fontSize: 20,
    color: COLORS.BLACK,
    marginTop: 20,
  },
});

export default Cart;
