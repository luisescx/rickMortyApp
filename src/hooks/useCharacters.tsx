import {useContext} from 'react';
import {CharacterContext} from '@/contexts/CharactersContext';

const useCharacters = () => {
  const context = useContext(CharacterContext);

  if (context) {
    return context;
  }

  throw new Error('Character provider must be setted.');
};

export default useCharacters;
