import React from 'react';
import PropTypes from 'prop-types';
import {COLORS, FONTS} from '../../config';
import {StarRating} from '../../components';
import {StyleSheet, Text, View} from 'react-native';

const Reviews = ({reviews}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reviews:</Text>
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <Text style={styles.reviewUser}>{review.user}</Text>
          <StarRating rating={review.rating} />
          <Text style={styles.text}>{review.comment}</Text>
          <Text style={styles.text}>{`Date: ${review.date}`}</Text>
        </View>
      ))}
    </View>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },

  reviewContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
});
