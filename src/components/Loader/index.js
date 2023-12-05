import React from 'react';
import {COLORS} from '../../config';
import Modal from 'react-native-modal';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loading = ({isVisible, onBackdropPress}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.2}
      onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.BLACK} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {margin: 0},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Loading;
