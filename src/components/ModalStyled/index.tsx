import React from 'react';
import {ModalProps} from 'react-native-modal';
import {Modal, ModalContainer, Shape} from './styles';

interface ModalStyledProps
  extends Omit<
    Partial<ModalProps>,
    'isVisible' | 'onBackdropPress' | 'onBackdropPress'
  > {
  visible: boolean;
  onDismiss: () => void;
  hasFlatlist?: boolean;
}

const ModalStyled: React.FC<ModalStyledProps> = ({
  visible,
  onDismiss,
  children,
  hasFlatlist = false,
  ...rest
}) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} style={{}} {...rest}>
      <ModalContainer hasFlatlist={hasFlatlist}>
        <Shape />

        {children}
      </ModalContainer>
    </Modal>
  );
};

export default ModalStyled;
