import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  background-color: #1f7476;
  flex-direction: row;
  border-radius: 5px;
`;

const InputFieldAttrs = ({theme}: any) => ({
  placeholderTextColor: theme.colors.secondary_light,
  selectionColor: theme.colors.secondary,
});

export const InputField = styled(TextInput).attrs(InputFieldAttrs)`
  flex: 1;
  padding: 0 12px;
  color: ${({theme}) => theme.colors.secondary};
  font-size: 16px;
`;

const InputButtonAttrs = () => ({
  activeOpacity: 0.7,
  hitSlop: {top: 8, right: 8, bottom: 8, left: 8},
});

export const InputButton = styled.TouchableOpacity.attrs(InputButtonAttrs)`
  background-color: ${({theme, disabled}) =>
    disabled ? theme.colors.secondary_light : theme.colors.secondary};
  padding: 12px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const InputIcon = styled(Icon)`
  color: ${({theme}) => theme.colors.primary};
`;
