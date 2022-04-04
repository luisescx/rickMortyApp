import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const WIDTH = SCREEN_WIDTH - 48;

export const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: ${getBottomSpace() + 24};
  left: 0;
`;

const ButtonAttrs = () => ({
  activeOpacity: 0.5,
  hitSlop: {top: 8, right: 8, bottom: 8, left: 8},
});

interface ButtonProps {
  isOutlined?: boolean;
}

export const Button = styled.TouchableOpacity.attrs(ButtonAttrs)<ButtonProps>`
  margin: 0 24px;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  padding: 16px 30px;
  width: ${WIDTH}px;
  height: 48px;
  background: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.secondary};
`;

export const ButtonLabel = styled.Text<ButtonProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme, isOutlined}) =>
    isOutlined ? theme.colors.secondary : theme.colors.primary};
  position: absolute;
`;
