import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {Button, ButtonContainer, ButtonLabel} from './styles';

interface FooterProps extends TouchableOpacityProps {
  label: string;
}

const Footer = ({label, ...rest}: FooterProps) => {
  return (
    <ButtonContainer>
      <Button {...rest} isOutlined>
        <ButtonLabel isOutlined>{label}</ButtonLabel>
      </Button>
    </ButtonContainer>
  );
};

export default Footer;
