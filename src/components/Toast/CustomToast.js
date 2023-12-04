import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, FONTS, IMAGES} from '../../config';

const iconMapping = {
  success: IMAGES.SAD_ROBOT,
  error: IMAGES.SAD_ROBOT,
  warning: IMAGES.SAD_ROBOT,
  info: IMAGES.SAD_ROBOT,
  favorite: IMAGES.SAD_ROBOT,
};

const CustomToast = ({
  type,
  message,
  image,
  description,
  action,
  duration,
  toastStyles = {
    container: {},
    toastContainer: {},
    image: {},
    infoBox: {},
    message: {},
    subText: {},
    action: {},
    actionText: {},
  },
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const timer = setTimeout(() => {
      hideToast();
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const containerStyle = {opacity: fadeAnim};

  return (
    <Animated.View
      style={[styles.container, containerStyle, toastStyles.container]}>
      <View
        style={[
          styles.toast,
          {
            backgroundColor:
              COLORS[`TOAST_${type.toUpperCase()}`] || COLORS.TOAST_DEFAULT,
            borderLeftColor: COLORS[type.toUpperCase()] || COLORS.BLACK,
          },
          toastStyles.toastContainer,
        ]}>
        <View style={type === 'favorite' ? styles.imageContainer : {}}>
          <Image
            source={image ? {uri: image} : iconMapping[type]}
            style={[styles.image, toastStyles.image]}
          />
        </View>
        <View style={[styles.infoBox, toastStyles.infoBox]}>
          <Text
            style={[styles.message, toastStyles.message]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {message}
          </Text>
          {description && (
            <Text
              style={[styles.data, toastStyles.subText]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {description}
            </Text>
          )}
        </View>
        {action && (
          <TouchableOpacity
            style={[styles.action, toastStyles.action]}
            onPress={action?.onPress || null}>
            <Text style={[styles.actionText, toastStyles.actionText]}>
              {action?.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

CustomToast.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }),
  duration: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  toast: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 8,
    width: '95%',
  },
  imageContainer: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 5,
  },
  image: {
    width: 18,
    height: 18,
  },
  infoBox: {
    flex: 1.3,
    marginLeft: 8,
    alignItems: 'flex-start',
  },
  message: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.BLACK,
    textTransform: 'capitalize',
  },
  data: {
    fontSize: 12,
    color: COLORS.SUB_HEADING,
    marginBottom: 5,
    textTransform: 'capitalize',
    width: '80%',
  },
  action: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONTS.MEDIUM,
    textAlign: 'center',
  },
});

export default CustomToast;
