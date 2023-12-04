import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {width} from '../../utils';

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
        <AntIcon name={rightIcon} size={15} color="#000" />
      </TouchableOpacity>
      {isVisible && children && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    elevation: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    padding: 8,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 17,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    elevation: 1,
    padding: 8,
    paddingHorizontal: 20,
    marginVertical: 2,
  },
  description: {
    fontSize: 17,
    color: '#546E7A',
    letterSpacing: 1,
    lineHeight: 24,
  },
});

export default Accordion;
