import Menu from './Menu';
import Reviews from './Reviews';
import Icon from '../../components/Icons';
import {COLORS, FONTS} from '../../config';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import RestaurantExtraDetails from './RestaurantExtraDetails';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import {ImageCarousel, Loader, MenuFAB, StarRating} from '../../components';

const RestaurantDetails = ({route}) => {
  const scrollRef = React.useRef(null);
  const restaurantId = route?.params?.restaurant?.id;
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRestaurantDetails();
  }, [restaurantId]);

  const getRestaurantDetails = async () => {
    try {
      const restaurantSnapshot = await firestore()
        .collection('restaurantsList')
        .doc(restaurantId)
        .get();
      const restaurantDetails = restaurantSnapshot.data();
      setRestaurant(restaurantDetails);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onMapPress = () =>
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${restaurant?.coordinates?.latitude},${restaurant?.coordinates?.longitude}`,
    );

  if (!restaurant) return <Loader isVisible={true} />;
  return (
    <>
      <Loader isVisible={isLoading} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <ImageCarousel images={restaurant.photos} />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <StarRating rating={restaurant.rating.average} />
            <Text style={styles.text}>{`Cuisine: ${restaurant.cuisine.join(
              ', ',
            )}`}</Text>
          </View>
          <Icon
            type="FontAwesome5"
            name="directions"
            size={30}
            color={COLORS.PRIMARY}
            onPress={onMapPress}
            style={{marginTop: 10}}
          />
        </View>
        <Menu
          restaurantName={restaurant?.name}
          menuItems={restaurant?.menuItems}
        />
        <RestaurantExtraDetails
          specials={restaurant?.specials}
          openingHours={restaurant?.openingHours}
        />
        <Reviews reviews={restaurant?.reviews} />
      </ScrollView>
      <MenuFAB
        menuItems={restaurant?.menuItems || []}
        onMenuItemPress={(item, index) => {
          scrollRef.current.scrollTo({y: 200 + index * 150, animated: true});
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.WHITE,
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  restaurantName: {
    fontSize: 22,
    fontFamily: FONTS.SEMIBOLD_ITALIC,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});

export default RestaurantDetails;
