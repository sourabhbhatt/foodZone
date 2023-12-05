import Icon from '../../components/Icons';
import RestaurantCard from './RestaurantCard';
import auth from '@react-native-firebase/auth';
import {COLORS, IMAGES, ROUTES} from '../../config';
import firestore from '@react-native-firebase/firestore';
import {View, FlatList, StyleSheet, Image} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';

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
          type="AntDesign"
          name="logout"
          color={COLORS.PRIMARY}
          onPress={onLogout}
        />
      ),

      headerRight: () => (
        <Icon
          type="AntDesign"
          name="shoppingcart"
          onPress={() => navigation.navigate(ROUTES.CART)}
          size={25}
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
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Image source={IMAGES.LOGO} style={styles.image} />
        }
        renderItem={({item}) => <RestaurantCard restaurant={item} />}
        showsVerticalScrollIndicator={false}
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
    width: '100%',
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default Home;
