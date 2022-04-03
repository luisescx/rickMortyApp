import React from 'react';
import Radio from '@/components/Radio';
import {OptionContainer, OptionLabel, Separator} from './styles';

interface PickerOptionProps {
  label: string;
  value: boolean;
  onChangeValue: (value: boolean) => void;
}

const PickerOption = ({label, value, onChangeValue}: PickerOptionProps) => {
  return (
    <>
      <OptionContainer>
        <OptionLabel>{label}</OptionLabel>

        <Radio value={value} onChange={onChangeValue} />
      </OptionContainer>

      <Separator />
    </>
  );
};

export default PickerOption;
