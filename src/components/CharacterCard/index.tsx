import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {
  Container,
  CharacterName,
  CharacterImage,
  Content,
  Footer,
} from './styles';

interface Props extends TouchableOpacityProps {
  name: string;
  imageUri: string;
  index: number;
  isOnModal?: boolean;
}

const CharacterCard = ({
  name,
  imageUri,
  index,
  isOnModal = false,
  ...rest
}: Props) => {
  return (
    <Container {...rest} activeOpacity={isOnModal ? 1 : 0.7} index={index}>
      <Content>
        <CharacterImage
          source={{
            uri: imageUri,
          }}
        />
      </Content>

      <Footer isOnModal={isOnModal}>
        <CharacterName isOnModal={isOnModal}>{name}</CharacterName>
      </Footer>
    </Container>
  );
};

export default CharacterCard;
