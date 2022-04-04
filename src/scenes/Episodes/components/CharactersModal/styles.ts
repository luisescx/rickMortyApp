import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.secondary};
  font-size: 25px;
  line-height: 28px;
  margin: 32px 0 0;
  text-align: center;
`;

export const OptionContainer = styled.View`
  margin: 16px 0 ${getBottomSpace() + 130}px 0;
`;
