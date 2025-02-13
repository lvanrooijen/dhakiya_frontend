import { createRoot } from "react-dom/client";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./basestyles/base.css";
import { ThemeProvider } from "./context/ThemeContext";
import { BasicPage } from "./layouts/basicpage/BasicPage";
import Environment from "./pages/environment/Environment";
import EnvironmentWrapper from "./pages/environment/EnvironmentWrapper";
import FlashCardDeck from "./pages/flashcarddeck/FlashCardDeck";
import { FlashCardDeckWrapper } from "./pages/flashcarddeck/FlashCardDeckWrapper";
import { HomePage } from "./pages/homepage/HomePage";
import NoteCollection from "./pages/notecollections/NoteCollection";
import { Quiz } from "./pages/quizcollections/components/quiz/Quiz";
import { QuizCollectionsPage } from "./pages/quizcollections/QuizCollectionsPage";
import QuizCollectionsWrapper from "./pages/quizcollections/QuizCollectionsWrapper";
import { TagPanel } from "./pages/tagpanel/TagPanel";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <BasicPage>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="environment/:id/*"
              element={
                <EnvironmentWrapper>
                  <Routes>
                    <Route path="/" element={<Environment />} />
                    <Route
                      path="/note-collection"
                      element={<NoteCollection />}
                    />
                    <Route path="/tag-panel" element={<TagPanel />} />
                    <Route
                      path="/flashcard-deck/:flashcardDeckId"
                      element={
                        <FlashCardDeckWrapper>
                          <FlashCardDeck />
                        </FlashCardDeckWrapper>
                      }
                    />
                    <Route
                      path="/quiz-collection/:quizCollectionId"
                      element={
                        <QuizCollectionsWrapper>
                          <QuizCollectionsPage />
                        </QuizCollectionsWrapper>
                      }
                    />
                    <Route
                      path="/quiz-collection/:quizCollectionId/quiz/:quizId"
                      element={
                        <QuizCollectionsWrapper>
                          <Quiz />
                        </QuizCollectionsWrapper>
                      }
                    />
                  </Routes>
                </EnvironmentWrapper>
              }
            />
          </Routes>
        </BasicPage>
      </Router>
    </ThemeProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
