import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RestaurantCard from './RestaurantCard';
import {COLORS, IMAGES, ROUTES} from '../../config';
import Icon from '../../components/Icons';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [restaurants, setRestaurants] = useState([]);

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="logout"
          size={30}
          color={COLORS.PRIMARY}
          onPress={onLogout}
        />
      ),

      headerRight: () => (
        <Icon
          type="AntDesign"
          name="shoppingcart"
          onPress={() => navigation.navigate(ROUTES.CART)}
          size={30}
          color={COLORS.PRIMARY}
        />
      ),
    });
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsSnapshot = await firestore()
          .collection('restaurantsList')
          .get();
        const restaurantList = restaurantsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(restaurantList);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.LOGO} style={styles.image} />
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        renderItem={({item}) => <RestaurantCard restaurant={item} />}
        contentContainerStyle={styles.restaurantList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
  },
  restaurantList: {paddingBottom: 20},
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Home;
