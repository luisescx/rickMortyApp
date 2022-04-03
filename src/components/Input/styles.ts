import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  background-color: #1f7476;
  flex-direction: row;
  border-radius: 5px;
`;

export const InputField = styled(TextInput).attrs(({theme}) => ({
  placeholderTextColor: theme.colors.secondary_light,
  selectionColor: theme.colors.secondary,
}))`
  flex: 1;
  padding: 0 12px;
  color: ${({theme}) => theme.colors.secondary};
  font-size: 16px;
`;

export const InputButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({theme, disabled}) =>
    disabled ? theme.colors.secondary_light : theme.colors.secondary};
  padding: 12px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const InputIcon = styled(Icon)`
  color: ${({theme}) => theme.colors.primary};
`;
