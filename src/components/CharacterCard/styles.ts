import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 16;
const CARD_WIDTH = SCREEN_WIDTH / 2 - PADDING_HORIZONTAL * 2;
const COMPONENT_WIDTH = Dimensions.get('window').width / 2 - PADDING_HORIZONTAL;

interface StyleProps {
  isOnModal: boolean;
}

interface ContainerProps {
  index: number;
  type: string;
}

export const Container = styled.TouchableOpacity.attrs(
  () => {},
)<ContainerProps>`
  width: ${CARD_WIDTH}px;
  margin-bottom: 16px;
  margin-right: ${({index}) => (index % 2 === 0 ? 16 : 0)}px;
`;

export const Content = styled.View<StyleProps>`
  background: ${({theme, isOnModal}) =>
    isOnModal ? theme.colors.secondary : theme.colors.primary};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 0 0 0px;
`;

export const CharacterName = styled.Text<StyleProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme, isOnModal}) =>
    isOnModal ? theme.colors.primary : theme.colors.secondary};
  font-size: 16px;
`;

export const CharacterImage = styled(FastImage).attrs({
  resizeMode: 'stretch',
})`
  width: 100%;
  height: ${COMPONENT_WIDTH}px;
  border-radius: 8px;
`;

export const Footer = styled.View<StyleProps>`
  background: ${({theme, isOnModal}) =>
    isOnModal ? theme.colors.secondary : theme.colors.primary};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 100%;
  align-items: center;
  padding: 4px 0;
`;
