import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AxiosClient } from "src/services/AxiosClient";
import type { GetFullFlashcardDeck } from "src/types/api";

interface FlashcardDeckContextType {
  flashCardDeck: GetFullFlashcardDeck;
  updateFlashCardDeck: () => void;
}

const FlashCardDeckContext = createContext<
  FlashcardDeckContextType | undefined
>(undefined);

interface FlashCardDeckProviderProps {
  children: ReactNode;
  id: string | number;
}

export const FlashCardDeckProvider: React.FC<FlashCardDeckProviderProps> = ({
  children,
  id,
}) => {
  const [flashCardDeck, setFlashCardDeck] =
    useState<GetFullFlashcardDeck | null>(null);

  const updateFlashCardDeck = () => {
    AxiosClient.get(`flashcard-decks/${id}`)
      .then((response: GetFullFlashcardDeck) => {
        setFlashCardDeck(response);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    updateFlashCardDeck();
  }, [id]);
  return (
    <FlashCardDeckContext.Provider
      value={{
        flashCardDeck,
        updateFlashCardDeck,
      }}
    >
      {children}
    </FlashCardDeckContext.Provider>
  );
};

export const useFlashCardDeck = () => {
  const context = React.useContext(FlashCardDeckContext);
  if (!context) {
    throw new Error(
      "useFlashcardDeck must be used within an FlashcardDeckProvider"
    );
  }
  return context;
};
