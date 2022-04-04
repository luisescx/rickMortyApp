import React, {createContext, useCallback, useMemo, useState} from 'react';

interface CharactersProps {
  characters: Character[];
  handleCharacters: (characters: Character[]) => void;
}

export const CharacterContext = createContext({} as CharactersProps);

const CharacterProvider: React.FC = ({children}) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const handleCharacters = useCallback((charactersList: Character[]) => {
    setCharacters(charactersList);
  }, []);

  const value = useMemo(
    () => ({
      characters,
      handleCharacters,
    }),
    [characters, handleCharacters],
  );

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;
