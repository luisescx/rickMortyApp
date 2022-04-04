import styled from 'styled-components/native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.secondary};
  font-size: 25px;
  line-height: 28px;
  margin: 32px 0 0;
  text-align: center;
`;

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.secondary};
  font-size: 20px;
  line-height: 28px;
  margin: 16px 0 0;
  text-align: center;
`;

export const OptionContainer = styled.View`
  margin: 16px 0 ${getBottomSpace() + 100}px 0;
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight()}px;
  padding: 0 24px;
  margin-bottom: 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
`;
