import styled from 'styled-components/native';

interface TabTitleProps {
  focused: boolean;
}

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text<TabTitleProps>`
  color: ${({theme, focused}) =>
    focused ? theme.colors.secondary : theme.colors.secondary_light};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 12px;
`;
