import styled from 'styled-components/native';

const ButtonAttrs = () => ({
  activeOpacity: 0.7,
  hitSlop: {top: 8, right: 8, bottom: 8, left: 8},
});

export const Container = styled.TouchableOpacity.attrs(ButtonAttrs)`
  background: ${({theme}) => theme.colors.primary};
  border-radius: 5px;
  padding: 12px;
  align-items: center;
  margin-left: 8px;
`;
