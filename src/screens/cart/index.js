import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, ROUTES} from '../../config';
import {Icon} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {setCartInfo} from '../../redux/slices/userSlice';

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
    const updatedItem = cartInfo?.find(e => e.id === item.id);
    if (!updatedItem) return;
    updatedItem.quantity = updatedItem.quantity + 1;
    const newCartInfo = cartInfo.map(e => (e.id === item.id ? updatedItem : e));
    dispatch(setCartInfo(newCartInfo));
  };

  const decrementQuantity = item => {
    if (item?.quantity == 1) {
      onRemove(item);
      return;
    }
    const updatedItem = cartInfo?.find(e => e.id === item?.id);
    if (!updatedItem) return;
    updatedItem.quantity = updatedItem.quantity - 1;
    const newCartInfo = cartInfo.map(e =>
      e.id === item?.id ? updatedItem : item,
    );
    dispatch(setCartInfo(newCartInfo));
  };

  const renderCartItem = ({item, index}) => {
    return (
      <View key={index} style={styles.cartItem}>
        <View style={styles.cartItemLeft}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.RestaurantDetail, {
                restaurantId: item?.restaurantId,
              })
            }>
            <Image source={{uri: item?.image}} style={styles.cartItemImage} />
          </TouchableOpacity>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.itemName}>{`${item?.name}`}</Text>
            <Text style={styles.price}>Price: ₹{item?.price?.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.remove}
              onPress={() => onRemove(item)}>
              <Text style={{color: COLORS.RED}}>{`Remove`}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <View style={styles.quantityButton}>
            <Icon
              type="FontAwesome"
              name="minus"
              size={15}
              color={COLORS.BLACK}
              onPress={() => decrementQuantity(item)}
            />
          </View>
          <Text style={styles.quantityText}>{item?.quantity || 1}</Text>
          <View style={styles.quantityButton}>
            <Icon
              type="FontAwesome"
              name="plus"
              size={15}
              color={COLORS.BLACK}
              onPress={() => incrementQuantity(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartInfo}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={
          <Text style={styles.noData}>{'No items in cart'}</Text>
        }
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalPrice}>
          {`Total: ₹${getTotalPrice().toFixed(2)}`}
        </Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.buttonText}>{'Checkout'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  cartList: {paddingBottom: 20},
  cartItem: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  cartItemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 0.6,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  itemName: {
    fontFamily: FONTS.MEDIUM,
    marginTop: 5,
    fontSize: 16,
  },
  price: {
    marginBottom: 2,
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
  },
  checkoutButton: {
    backgroundColor: COLORS.GREEN,
    padding: 10,
    borderRadius: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.BLACK,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 16,
  },

  // quantity
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    paddingHorizontal: 10,
  },
  //button
  remove: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: COLORS.RED,
    borderRadius: 5,
    padding: 5,
    width: 80,
    alignItems: 'center',
  },
  noData: {
    textAlign: 'center',
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    color: COLORS.BLACK,
    marginTop: 20,
  },
});

export default Cart;
