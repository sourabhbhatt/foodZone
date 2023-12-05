import React from 'react';
import {isIOS} from '../../utils';
import PropTypes from 'prop-types';
import {StarRating} from '../../components';
import {COLORS, FONTS, ROUTES} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';

const RestaurantCard = ({restaurant, index}) => {
  const navigation = useNavigation();

  const onPressCard = () =>
    navigation.navigate(ROUTES.RESTAURANT_DETAILS, {restaurant});

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPressCard}
      style={styles.card}
      key={index}>
      <Image source={{uri: restaurant.image}} style={styles.image} />

      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <StarRating rating={restaurant.rating.average} ratingFont={20} />
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

RestaurantCard.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.BORDER,
    marginBottom: 10,
  },
  shadow: {
    shadowColor: COLORS.BLA,
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: isIOS ? 0 : 2,
  },
  image: {
    width: '100%',
    height: 250,
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
    fontSize: 18,
    color: COLORS.TITLE,
    fontFamily: FONTS.SEMIBOLD,
    lineHeight: 20,
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    color: COLORS.SUB_TITLE,
    lineHeight: 17,
    fontFamily: FONTS.MEDIUM,
    marginTop: 5,
  },
});

export default RestaurantCard;
