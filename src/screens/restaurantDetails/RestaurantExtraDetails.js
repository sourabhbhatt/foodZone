import React from 'react';
import PropTypes from 'prop-types';
import {COLORS, FONTS} from '../../config';
import {Accordion} from '../../components';
import {StyleSheet, Text, View} from 'react-native';

const RestaurantExtraDetails = ({specials, openingHours}) => {
  return (
    <View style={styles.container}>
      <Accordion title={'Specials'}>
        {specials?.map((special, index) => (
          <View key={index} style={styles.specialContainer}>
            <Text style={styles.specialName}>{special.name}</Text>
            <Text style={styles.text}>{special.description}</Text>
            <Text
              style={
                styles.text
              }>{`Valid Dates: ${special.validDates.start} - ${special.validDates.end}`}</Text>
          </View>
        ))}
      </Accordion>
      {openingHours && (
        <>
          <Accordion title="Opening Hours:">
            <View style={styles.table}>
              {Object.entries(openingHours).map(([day, hours]) => (
                <View key={day} style={styles.row}>
                  <Text style={styles.cell}>{day}</Text>
                  <Text style={styles.cell}>{hours}</Text>
                </View>
              ))}
            </View>
          </Accordion>
        </>
      )}
    </View>
  );
};

RestaurantExtraDetails.propTypes = {
  specials: PropTypes.array,
  openingHours: PropTypes.object,
};

export default RestaurantExtraDetails;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  specialContainer: {
    marginTop: 15,
    backgroundColor: COLORS.DEFAULT,
    padding: 15,
  },
  specialName: {
    fontSize: 18,
    fontFamily: FONTS.SEMIBOLD,
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
    fontFamily: FONTS.MEDIUM,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    fontFamily: FONTS.MEDIUM,
    textTransform: 'capitalize',
  },
});
