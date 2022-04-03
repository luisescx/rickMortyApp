import {TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const RadioContainer = styled(AnimatedTouchable)`
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.secondary};
  border-radius: 12px;
  height: 24px;
  width: 24px;
  justify-content: center;
`;

export const RadioBall = styled(Animated.View)`
  background: ${({theme}) => theme.colors.primary};
`;
