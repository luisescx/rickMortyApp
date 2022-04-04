import React, {useCallback} from 'react';
import {CharacterCard, Footer} from '@/components';
import {FlatList} from 'react-native';
import {OptionContainer, Title} from './styles';

interface CharactersModalProps {
  characters: Character[];
  onClose: () => void;
}

const CharactersModal = ({characters, onClose}: CharactersModalProps) => {
  const renderItem = useCallback(
    ({item, index}) => (
      <CharacterCard
        imageUri={item.image}
        name={item.name}
        index={index}
        isOnModal={true}
      />
    ),
    [],
  );

  return (
    <>
      <Title>Characters</Title>

      <OptionContainer>
        <FlatList
          data={characters}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
          }}
        />
      </OptionContainer>

      <Footer onPress={onClose} label="Close" />
    </>
  );
};

export default CharactersModal;
