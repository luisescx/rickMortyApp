import styled, {css} from 'styled-components/native';

interface ContainerProps {
  isFullScreen: boolean;
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;

  ${({isFullScreen}) =>
    isFullScreen &&
    css`
      flex: 1;
    `}
`;
