import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Accordion, Button} from '../../components';
import {COLORS, FONTS, ROUTES} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {setCartInfo} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';

const Menu = ({menuItems}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartInfo = useSelector(state => state?.user?.cartInfo);

  const addToCart = item => {
    const updatedItem = cartInfo?.find(e => e.id === item.id);
    if (updatedItem) {
      updatedItem.quantity = updatedItem.quantity + 1;
      const newCartInfo = cartInfo.map(e =>
        e.id === item.id ? updatedItem : e,
      );
      dispatch(setCartInfo(newCartInfo));
      return;
    }
    const newCartInfo = [...cartInfo, {...item, quantity: 1}];
    dispatch(setCartInfo(newCartInfo));
  };

  const checkIfAlreadyAddedToCart = item => {
    const updatedItem = cartInfo?.find(e => e.id === item.id);
    return !!updatedItem;
  };

  const navigateToCart = () => navigation.navigate(ROUTES.CART);

  return (
    <View>
      {menuItems.map((item, index) => (
        <Accordion title={item?.name} key={index}>
          {item?.data?.map((data, i) => (
            <View style={styles.menuItem} key={i}>
              <View style={styles.left}>
                <Image source={{uri: data.image}} style={styles.image} />
                <View style={{flex: 1, marginLeft: 5}}>
                  <Text style={styles.title}>{data.name}</Text>
                  <Text style={styles.text}>{`Price: ${data.price}`}</Text>
                </View>
              </View>
              <Button
                rightIcon={checkIfAlreadyAddedToCart() ? 'check' : 'cart'}
                title={
                  checkIfAlreadyAddedToCart() ? 'View Cart' : 'Add to Cart'
                }
                onPress={() => {
                  checkIfAlreadyAddedToCart()
                    ? navigateToCart()
                    : addToCart(data);
                }}
              />
            </View>
          ))}
        </Accordion>
      ))}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.TITLE,
    fontFamily: FONTS.SEMIBOLD,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.SUB_TITLE,
    fontFamily: FONTS.MEDIUM,
  },
});
