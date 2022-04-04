import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
  background-color: ${({theme}) => theme.colors.secondary};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 3px;
  position: absolute;
  width: 68px;
`;
