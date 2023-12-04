import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from '../Icons';
import {COLORS, FONTS} from '../../config';

const Button = ({
  onPress,
  title,
  rightIcon,
  iconType = 'AntDesign',
  iconSize = 20,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {justifyContent: rightIcon ? 'space-between' : 'center'},
        style,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {!!rightIcon && (
        <Icon
          type={iconType}
          name={rightIcon}
          size={iconSize}
          color={COLORS.WHITE}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    height: 40,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    marginHorizontal: 5,
  },
});

export default Button;
