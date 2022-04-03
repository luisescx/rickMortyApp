import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import ModalDefault from '../Modal';

export const Modal = styled(ModalDefault)`
  justify-content: flex-end;
  margin: 0;
`;

const paddingBottom = Platform.select({
  ios: getBottomSpace(),
  default: 0,
});

export const ModalContainer = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  max-height: 80%;
  padding: 24px 24px ${paddingBottom + 24}px;
`;

export const Shape = styled.View`
  align-self: center;
  background: ${({theme}) => theme.colors.secondary};
  border-radius: 5px;
  height: 6px;
  width: 64px;
`;
