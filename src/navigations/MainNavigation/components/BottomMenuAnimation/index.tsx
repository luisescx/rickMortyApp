import React from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Container} from './styles';

interface BottomMenuAnimationProps {
  animTab: SharedValue<number>;
}

const bottom = Platform.select({
  android: 0,
  ios: getBottomSpace(),
});

const BottomMenuAnimation = ({animTab}: BottomMenuAnimationProps) => {
  const {width} = useWindowDimensions();

  const tabStyles = useAnimatedStyle(() => {
    const bottomWidth = width / 2;
    const translateX = bottomWidth / 2 - 34;

    const left = interpolate(
      animTab.value,
      [0, 1],
      [translateX, translateX + bottomWidth],
      Extrapolate.CLAMP,
    );

    return {
      left,
      bottom,
    };
  });

  return <Container style={tabStyles} />;
};

export default BottomMenuAnimation;
