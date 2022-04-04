import React, {useCallback, useState} from 'react';
import {useTheme} from 'styled-components';
import Icon from '../Icon';
import ModalStyled from '../ModalStyled';
import Picker from '../Picker';

import {Container} from './styles';

interface FilterProps {
  modalTitle: string;
  defaultSelectedId: number;
  onConfirm: (selectedId: number) => void;
}

const ORDERS = [
  {id: 1, label: 'Ascendant'},
  {id: 2, label: 'Decrescent'},
];

const Filter = ({modalTitle, defaultSelectedId, onConfirm}: FilterProps) => {
  const [visible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(defaultSelectedId);
  const {colors} = useTheme();

  const handleConfirm = useCallback(
    (id: number) => {
      setIsVisible(false);
      setSelectedId(id);

      setTimeout(() => {
        onConfirm(id);
      }, 500);
    },
    [onConfirm],
  );

  return (
    <>
      <Container onPress={() => setIsVisible(true)}>
        <Icon name="filter" size={20} color={colors.secondary} />
      </Container>

      <ModalStyled visible={visible} onDismiss={() => setIsVisible(false)}>
        <Picker
          title={modalTitle}
          options={ORDERS}
          onClose={() => setIsVisible(false)}
          onConfirm={handleConfirm}
          pickerSelectedId={selectedId}
        />
      </ModalStyled>
    </>
  );
};

export default Filter;
