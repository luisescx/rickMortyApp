import React, {useCallback, useEffect} from 'react';
import {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from 'styled-components';
import {RadioBall, RadioContainer} from './styles';

interface RadioProps {
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

const Radio = ({value, disabled, onChange}: RadioProps) => {
  const {colors} = useTheme();

  const valueAnim = useSharedValue(Number(value));

  const containerStyle = useAnimatedStyle(() => {
    if (disabled) {
      return {
        backgroundColor: value ? colors.secondary : colors.errorLight,
      };
    }

    return {
      backgroundColor: interpolateColor(
        valueAnim.value,
        [0, 1],
        [colors.primary_light, colors.secondary],
      ) as string,
    };
  });

  const radioBallStyle = useAnimatedStyle(() => {
    const sizeInterpolation = interpolate(
      valueAnim.value,
      [0, 1],
      [0, 8],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius: sizeInterpolation,
      height: sizeInterpolation,
      width: sizeInterpolation,
    };
  });

  const handlePress = useCallback(() => {
    if (!value) {
      onChange(true);
    }
  }, [value, onChange]);

  useEffect(() => {
    valueAnim.value = withTiming(Number(value), {duration: 250});
  }, [value, valueAnim]);

  return (
    <RadioContainer
      disabled={disabled}
      style={containerStyle}
      onPress={handlePress}
      hitSlop={{top: 8, right: 8, bottom: 8, left: 8}}>
      <RadioBall style={radioBallStyle} />
    </RadioContainer>
  );
};

export default Radio;
