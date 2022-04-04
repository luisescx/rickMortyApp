import styled, {css} from 'styled-components/native';

interface ButtonProps {
  index: number;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  border-top-color: ${({theme}) => theme.colors.secondary_light};
  border-top-width: 1px;

  ${({index}) =>
    index === 0 &&
    css`
      border-top-width: 0;
    `}
`;

interface DescriptionProps {
  isSelected: boolean;
}

export const Description = styled.Text<DescriptionProps>`
  color: ${({theme}) => theme.colors.secondary};
  padding: 8px 0;

  ${({isSelected}) =>
    isSelected &&
    css`
      background: ${({theme}) => theme.colors.secondary};
      color: ${({theme}) => theme.colors.secondary_light};
    `}
`;
