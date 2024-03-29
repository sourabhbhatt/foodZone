import React from 'react';
import PropTypes from 'prop-types';
import {COLORS, FONTS, ROUTES} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setCartInfo} from '../../redux/slices/userSlice';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Accordion, Button, showToastMessage} from '../../components';

const Menu = ({menuItems, restaurantName}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartInfo = useSelector(state => state?.user?.cartInfo);

  const addToCart = item => {
    const updatedItem = cartInfo?.find(e => e?.id === item?.id);
    if (updatedItem) {
      showToastMessage({
        message: 'Item already added to cart',
        type: 'info',
      });
      return;
    }
    const newCartInfo = [...cartInfo, {...item, quantity: 1, restaurantName}];
    dispatch(setCartInfo(newCartInfo));
    showToastMessage({
      message: 'Item added to cart',
      type: 'success',
    });
  };

  const checkIfAlreadyAddedToCart = item => {
    const updatedItem = cartInfo?.find(e => e?.id === item?.id);
    return !!updatedItem || false;
  };

  const navigateToCart = () => navigation.navigate(ROUTES.CART);

  return (
    <View style={styles.container}>
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
                iconType={
                  checkIfAlreadyAddedToCart(data) ? 'Entypo' : 'AntDesign'
                }
                iconSize={18}
                rightIcon={
                  checkIfAlreadyAddedToCart(data)
                    ? 'chevron-right'
                    : 'shoppingcart'
                }
                title={
                  checkIfAlreadyAddedToCart(data) ? 'View Cart' : 'Add to Cart'
                }
                onPress={() => {
                  checkIfAlreadyAddedToCart(data)
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

Menu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  restaurantName: PropTypes.string.isRequired,
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
    marginTop: 10,
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
