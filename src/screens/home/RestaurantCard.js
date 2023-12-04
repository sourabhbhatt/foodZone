import React from 'react';
import {StarRating, showToastMessage} from '../../components';
import {COLORS, FONTS, IMAGES, ROUTES} from '../../config';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RestaurantCard = ({restaurant}) => {
  const navigation = useNavigation();

  const onPressCard = () =>
    navigation.navigate(ROUTES.RESTAURANT_DETAILS, {restaurant});

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPressCard}>
      <Image source={{uri: restaurant.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <StarRating rating={restaurant.rating.average} />
        </View>
        <Text style={styles.text}>{`Cuisine: ${restaurant.cuisine.join(
          ', ',
        )}`}</Text>
        <Text
          style={
            styles.text
          }>{`Rating: ${restaurant.rating.average} (${restaurant.rating.reviews} reviews)`}</Text>
        <Text style={styles.text}>{`Distance: ${restaurant.distance} km`}</Text>
        <Text
          style={
            styles.text
          }>{`Estimated Delivery Time: ${restaurant.estimatedDeliveryTime}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.BORDER,
    marginBottom: 10,
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 16,
    color: COLORS.TITLE,
    fontFamily: FONTS.BOLD,
    lineHeight: 20,
    marginTop: 5,
  },
  text: {
    fontSize: 13,
    color: COLORS.SUB_TITLE,
    lineHeight: 17,
    fontFamily: FONTS.REGULAR,
    marginTop: 5,
  },
});

export default RestaurantCard;
