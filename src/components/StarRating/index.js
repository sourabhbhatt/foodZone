import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Icon from '../Icons';
import {COLORS} from '../../config';

const StarRating = ({rating = 0, ratingFont = 20}) => {
  const totalStars = 5;
  const starIcons = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      // Render a filled star if the index is less than or equal to the rating count.
      starIcons.push(
        <Icon
          key={i}
          name="star"
          type="FontAwesome"
          style={[styles.star, {fontSize: ratingFont}]}
        />,
      );
    } else if (i - 0.5 <= rating) {
      // Render a half-filled star if the index - 0.5 is less than the rating count.
      starIcons.push(
        <Icon
          key={i}
          name="star-half-empty"
          type="FontAwesome"
          style={[styles.star, {fontSize: ratingFont}]}
        />,
      );
    } else {
      // Render an empty star if none of the above conditions are met.
      starIcons.push(
        <Icon
          key={i}
          name="star-o"
          type="FontAwesome"
          style={[styles.star, {fontSize: ratingFont}]}
        />,
      );
    }
  }

  return <View style={styles.ratingContainer}>{starIcons}</View>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  ratingFont: PropTypes.number,
};

const styles = {
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: COLORS.YELLOW,
    fontSize: 25,
    marginRight: 2,
  },
};

export default StarRating;
