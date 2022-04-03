import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import PickerOption from './components/PickerOption';

import {
  ModalContainer,
  Title,
  OptionContainer,
  ButtonContainer,
  Button,
  ButtonLabel,
} from './styles';

export interface PickerOptions {
  id: number;
  label: string;
}

interface PickerProps {
  title: string;
  options: PickerOptions[];
  pickerSelectedId?: number;
  onClose: () => void;
  onConfirm: (value: number) => void;
}

const Picker = ({
  title,
  options,
  pickerSelectedId,
  onClose,
  onConfirm,
}: PickerProps) => {
  const [selectedId, setSelectedId] = useState<number>();

  const renderOptionsItem = useCallback(
    ({item}: ListRenderItemInfo<PickerOptions>) => (
      <PickerOption
        {...item}
        onChangeValue={() => setSelectedId(item.id)}
        value={item.id === selectedId}
      />
    ),
    [selectedId],
  );

  const handleConfirm = useCallback(() => {
    if (selectedId) {
      onConfirm(selectedId);
    }
  }, [selectedId, onConfirm]);

  useEffect(() => {
    if (pickerSelectedId) {
      setSelectedId(pickerSelectedId);
    }
  }, [pickerSelectedId]);

  return (
    <ModalContainer>
      <Title>{title}</Title>

      <OptionContainer>
        <FlatList
          data={options}
          renderItem={renderOptionsItem}
          keyExtractor={({id}) => String(id)}
          showsVerticalScrollIndicator={false}
        />
      </OptionContainer>

      <ButtonContainer>
        <Button onPress={onClose} isOutlined>
          <ButtonLabel isOutlined>Cancel</ButtonLabel>
        </Button>

        <Button onPress={handleConfirm} disabled={!selectedId}>
          <ButtonLabel>Confirm</ButtonLabel>
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default Picker;
