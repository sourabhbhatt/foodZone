import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import Modal from 'react-native-modal';
import {FONTS} from '../../config';

const MenuFAB = ({menuItems, onMenuItemPress}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const initialValue = menuVisible ? 1 : 0;
    const finalValue = menuVisible ? 0 : 1;

    setMenuVisible(!menuVisible);

    animation.setValue(initialValue);
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={() => {
          onMenuItemPress(item);
          toggleMenu();
        }}>
        <Text>{item.name}</Text>
        <Text>({item.count})</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={menuVisible} style={{margin: 0}}>
        <View style={[styles.menu]}>
          <Text style={styles.menuTitle}>{`Your Personalized picks`} </Text>
          {renderMenuItems()}
        </View>
        <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
          <Text style={styles.fabText}>{'Close'}</Text>
        </TouchableOpacity>
      </Modal>
      {!menuVisible && (
        <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
          <Text style={styles.fabText}>{'Menu'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    elevation: 3,
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    bottom: 90,
    right: 20,
    elevation: 3,
    width: '60%',
    borderRadius: 5,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD_ITALIC,
    margin: 10,
    color: '#333',
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MenuFAB;
