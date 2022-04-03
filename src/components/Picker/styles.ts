import {Dimensions} from 'react-native';
import styled, {css} from 'styled-components/native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const WIDTH = (SCREEN_WIDTH - 24 * 2 - 16) / 2;

export const Modal = styled.View`
  justify-content: flex-end;
  margin: 0;
`;

export const ModalContainer = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.secondary};
  font-size: 25px;
  line-height: 28px;
  margin: 32px 0 0;
  text-align: center;
`;

export const OptionContainer = styled.View`
  margin: 60px 0;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ButtonAttrs = () => ({
  activeOpacity: 0.5,
  hitSlop: {top: 8, right: 8, bottom: 8, left: 8},
});

interface ButtonProps {
  isOutlined?: boolean;
}

export const Button = styled.TouchableOpacity.attrs(ButtonAttrs)<ButtonProps>`
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  padding: 16px 30px;
  width: ${WIDTH}px;
  height: 48px;

  ${({isOutlined}) =>
    isOutlined &&
    css`
      background: ${({theme}) => theme.colors.primary};
      border: 1px solid ${({theme}) => theme.colors.secondary};
      margin-right: 16px;
    `}

  ${({disabled}) =>
    disabled &&
    css`
      background: ${({theme}) => theme.colors.secondary_light};
    `}

  ${({disabled, isOutlined}) =>
    !disabled &&
    !isOutlined &&
    css`
      background: ${({theme}) => theme.colors.secondary};
    `}
`;

export const ButtonLabel = styled.Text<ButtonProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme, isOutlined}) =>
    isOutlined ? theme.colors.secondary : theme.colors.primary};
  position: absolute;
`;
