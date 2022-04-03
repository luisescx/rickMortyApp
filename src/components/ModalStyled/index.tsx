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
}

const ModalStyled: React.FC<ModalStyledProps> = ({
  visible,
  onDismiss,
  children,
  ...rest
}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      style={{justifyContent: 'flex-end', margin: 0}}
      {...rest}>
      <ModalContainer>
        <Shape />

        {children}
      </ModalContainer>
    </Modal>
  );
};

export default ModalStyled;
