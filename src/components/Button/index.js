import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from '../Icons';
import {COLORS, FONTS} from '../../config';

const Button = ({
  onPress,
  title,
  rightIcon,
  iconType = 'AntDesign',
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {!!rightIcon && (
        <Icon type={iconType} name={rightIcon} size={20} color={COLORS.WHITE} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
  },
});

export default Button;
