import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {Container, InputButton, InputField, InputIcon} from './styles';

interface InputProps extends TextInputProps {
  handleInputSearch: (value: string) => void;
  isValueEmpty: boolean;
}

const Input = ({handleInputSearch, isValueEmpty, ...rest}: InputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    return inputValue === '';
  }, [inputValue]);

  const handleSearch = useCallback(() => {
    inputRef.current!.blur();
    handleInputSearch(inputValue);
  }, [handleInputSearch, inputValue]);

  useEffect(() => {
    if (isValueEmpty) {
      setInputValue('');
    }
  }, [isValueEmpty]);

  return (
    <Container>
      <InputField
        {...rest}
        ref={inputRef}
        value={inputValue}
        onChangeText={setInputValue}
        autoCapitalize="none"
        onSubmitEditing={handleSearch}
        autoCorrect={false}
        returnKeyType="send"
      />

      <InputButton onPress={handleSearch} disabled={isDisabled}>
        <InputIcon name="search" size={20} />
      </InputButton>
    </Container>
  );
};

export default Input;
