import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Alert, TextInput, TextInputProps} from 'react-native';
import {Container, InputButton, InputField, InputIcon} from './styles';

interface InputProps extends TextInputProps {
  handleInputSearch: (value: string) => void;
}

const Input = ({handleInputSearch, ...rest}: InputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    return inputValue === '';
  }, [inputValue]);

  const handleSearch = useCallback(() => {
    if (inputValue === '') {
      Alert.alert('Type a valid Name before confirming your search');
      return;
    }

    inputRef.current!.blur();
    setInputValue('');
    handleInputSearch(inputValue);
  }, [handleInputSearch, inputValue]);

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
