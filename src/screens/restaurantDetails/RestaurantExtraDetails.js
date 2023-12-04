import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RestaurantExtraDetails = ({specials, openingHours}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Specials:</Text>
      {specials?.length !== 0 &&
        specials?.map((special, index) => (
          <View key={index} style={styles.specialContainer}>
            <Text style={styles.specialName}>{special.name}</Text>
            <Text style={styles.text}>{special.description}</Text>
            <Text
              style={
                styles.text
              }>{`Valid Dates: ${special.validDates.start} - ${special.validDates.end}`}</Text>
          </View>
        ))}
      {openingHours && (
        <>
          <Text style={styles.sectionTitle}>Opening Hours:</Text>
          <View style={styles.table}>
            {Object.entries(openingHours).map(([day, hours]) => (
              <View key={day} style={styles.row}>
                <Text style={styles.cell}>{day}</Text>
                <Text style={styles.cell}>{hours}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
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
    marginBottom: 15,
  },
  specialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
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
    fontSize: 16,
    color: '#555',
  },
});
