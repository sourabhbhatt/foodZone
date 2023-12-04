import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

const Icon = ({
  name = 'language',
  type = 'Entypo',
  style = {},
  color,
  size = 20,
  onPress,
  containerStyle = {},
}) => {
  const iconContainerStyle = Array.isArray(containerStyle)
    ? containerStyle
    : [containerStyle];

  var CustomIcon;
  switch (type) {
    case 'AntDesign':
      CustomIcon = AntDesign;
      break;
    case 'Entypo':
      CustomIcon = Entypo;
      break;
    case 'EvilIcons':
      CustomIcon = EvilIcons;
      break;
    case 'Feather':
      CustomIcon = Feather;
      break;
    case 'FontAwesome':
      CustomIcon = FontAwesome;
      break;
    case 'FontAwesome5':
      CustomIcon = FontAwesome5;
      break;
    case 'FontAwesome5Brands':
      CustomIcon = FontAwesome5Brands;
      break;
    case 'Fontisto':
      CustomIcon = Fontisto;
      break;
    case 'Foundation':
      CustomIcon = Foundation;
      break;
    case 'Ionicons':
      CustomIcon = Ionicons;
      break;
    case 'MaterialCommunityIcons':
      CustomIcon = MaterialCommunityIcons;
      break;
    case 'MaterialIcons':
      CustomIcon = MaterialIcons;
      break;
    case 'Octicons':
      CustomIcon = Octicons;
      break;
    case 'SimpleLineIcons':
      CustomIcon = SimpleLineIcons;
      break;
    case 'Zocial':
      CustomIcon = Zocial;
      break;
    default:
      CustomIcon = Ionicons;
      break;
  }
  return (
    <TouchableOpacity onPress={onPress} style={iconContainerStyle}>
      <CustomIcon name={name} style={style} color={color} size={size} />
    </TouchableOpacity>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
};

export default Icon;
