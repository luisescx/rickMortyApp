import styled from 'styled-components/native';

export const OptionContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const OptionLabel = styled.Text`
  color: ${({theme}) => theme.colors.secondary};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 16px;
`;

export const Separator = styled.View`
  background: ${({theme}) => theme.colors.secondary_light};
  height: 1px;
  margin-bottom: 20px;
  width: 100%;
`;
