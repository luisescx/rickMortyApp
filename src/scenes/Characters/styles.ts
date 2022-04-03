import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  background-color: #040809;
  padding: 24px 0 12px;
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

const SyncButtonAttrs = () => ({
  activeOpacity: 0.7,
});

export const SyncButton = styled(TouchableOpacity).attrs(SyncButtonAttrs)`
  position: absolute;
  bottom: 20px;
  right: 26px;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const SyncIcon = styled(Icon)`
  color: ${({theme}) => theme.colors.primary};
`;
