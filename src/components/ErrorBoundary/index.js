import {height} from '../../utils';
import React, {Component} from 'react';
import {COLORS, FONTS, IMAGES} from '../../config';
import {StyleSheet, Image, Text, View, SafeAreaView} from 'react-native';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({hasError: true, error: error});
  }
  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View style={style.container}>
            <View style={style.mainContainer}>
              <Image source={IMAGES.SAD_ROBOT} style={style.img} />
              <Text style={style.errorTitle}> Oops .... ! </Text>
              <Text style={style.errorDesc}> Something went wrong. </Text>
              <Text style={style.errorDesc}> Sorry about that. </Text>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return <View style={style.childrenWrapper}>{this.props.children}</View>;
    }
  }
}
const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mainContainer: {
    alignItems: 'center',
  },
  img: {
    height: 150,
    width: 150,
  },
  errorTitle: {
    fontSize: 30,
    color: COLORS.BLACK,
    lineHeight: 30,
    fontFamily: FONTS.MEDIUM,
  },
  errorDesc: {
    fontSize: 20,
    color: COLORS.SUB_HEADING,
    fontFamily: FONTS.MEDIUM,
  },
  childrenWrapper: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  scrollContainer: {
    height: height / 2,
    padding: 10,
  },
  errorCode: {
    fontSize: 13,
    color: COLORS.GREEN,
    fontFamily: FONTS.MEDIUM,
  },
});

export default ErrorBoundary;
