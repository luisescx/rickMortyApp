import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {Color} from '@/styles/colors';
import icons from '@/styles/icons';

export type IconName = keyof typeof icons;

interface IconProps extends SvgProps {
  size?: number;
  name: IconName;
  style?: StyleProp<ViewStyle>;
  color?: Color;
  height?: number;
  width?: number;
}

const Icon = ({name, size, color, ...rest}: IconProps) => {
  const IconComponent = icons[name];

  return (
    <IconComponent
      {...rest}
      stroke={color}
      height={size || 24}
      width={size || 24}
    />
  );
};

export default Icon;
