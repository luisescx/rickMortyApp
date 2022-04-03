import React from 'react';
import RNModal, {ModalProps} from 'react-native-modal';

interface ModalComponentProps
  extends Omit<
    Partial<ModalProps>,
    'isVisible' | 'onBackdropPress' | 'onBackdropPress'
  > {
  visible: boolean;
  onDismiss: () => void;
}

const Modal = ({
  visible,
  onDismiss,
  children,
  ...props
}: ModalComponentProps) => {
  return (
    <RNModal
      {...props}
      isVisible={visible}
      onBackdropPress={onDismiss}
      onBackButtonPress={onDismiss}
      statusBarTranslucent>
      {children}
    </RNModal>
  );
};

export default Modal;
