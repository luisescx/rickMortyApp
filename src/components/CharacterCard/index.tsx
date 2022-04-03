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
}

const CharacterCard = ({name, imageUri, index, ...rest}: Props) => {
  return (
    <Container {...rest} activeOpacity={0.7} index={index}>
      <Content>
        <CharacterImage
          source={{
            uri: imageUri,
          }}
        />
      </Content>

      <Footer>
        <CharacterName>{name}</CharacterName>
      </Footer>
    </Container>
  );
};

export default CharacterCard;
