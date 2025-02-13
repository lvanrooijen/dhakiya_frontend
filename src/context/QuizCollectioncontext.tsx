import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AxiosClient } from "src/services/AxiosClient";
import type { GetQuizCollection } from "src/types/api";

interface QuizCollectionContextType {
  quizCollection: GetQuizCollection;
  updateQuizCollection: () => void;
}

const QuizCollectionContext = createContext<
  QuizCollectionContextType | undefined
>(undefined);

interface QuizCollectionProviderProps {
  children: ReactNode;
  id: string | number;
}

export const QuizCollectionProvider: React.FC<QuizCollectionProviderProps> = ({
  children,
  id,
}) => {
  const [quizCollection, setQuizCollection] =
    useState<GetQuizCollection | null>(null);

  const updateQuizCollection = () => {
    AxiosClient.get(`quiz-collections/${id}`)
      .then((response: GetQuizCollection) => {
        setQuizCollection(response);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    updateQuizCollection();
  }, [id]);
  return (
    <QuizCollectionContext.Provider
      value={{
        quizCollection,
        updateQuizCollection,
      }}
    >
      {children}
    </QuizCollectionContext.Provider>
  );
};

export const useQuizCollection = () => {
  const context = React.useContext(QuizCollectionContext);
  if (!context) {
    throw new Error(
      "useQuizCollection must be used within an QuizCollectionProvider"
    );
  }
  return context;
};
