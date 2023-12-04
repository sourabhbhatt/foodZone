import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Icon} from '../../components';
import {COLORS, FONTS, ROUTES} from '../../config';
import {useNavigation} from '@react-navigation/native';

const CartItem = ({
  item,
  index,
  onRemove,
  decrementQuantity,
  incrementQuantity,
}) => {
  const navigation = useNavigation();
  return (
    <View key={index} style={styles.cartItem}>
      <View style={styles.cartItemLeft}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTES.RESTAURANT_DETAILS, {
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

const styles = StyleSheet.create({
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
});

export default CartItem;
