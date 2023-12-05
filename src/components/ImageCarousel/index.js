import React, {useState} from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../config';

const ImageCarousel = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {width: windowWidth} = Dimensions.get('window');

  const handleScroll = event => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / windowWidth);
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <Image key={index} source={{uri: image}} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {opacity: index === activeIndex ? 1 : 0.5},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 250,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    margin: 5,
  },
});

export default ImageCarousel;
