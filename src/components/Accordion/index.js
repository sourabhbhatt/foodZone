import React, {useState} from 'react';
import {COLORS, FONTS} from '../../config';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Accordion = ({
  title = 'No Title Available',
  visible = true,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const rightIcon = isVisible ? 'caretdown' : 'caretright';

  const toggleAccordion = () => setIsVisible(!isVisible);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        <AntIcon name={rightIcon} size={15} color={COLORS.BLACK} />
      </TouchableOpacity>
      {isVisible && children && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: COLORS.DEFAULT,
    borderBottomColor: '#E0E0E0',
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.BLACK,
  },
});

export default Accordion;
