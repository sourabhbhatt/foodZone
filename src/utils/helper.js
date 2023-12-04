import {Dimensions, Platform} from 'react-native';
export const {width, height} = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';

export const formatCurrency = amount => {
  return `$${amount.toFixed(2)}`;
};

export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
