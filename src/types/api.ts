/* eslint-disable prettier/prettier */

/* This file holds all the interfaces related to the backends http requests responses and bodies */

/* Api Enums */
enum STATUS {
  WEAK,
  MEDIOCRE,
  GOOD,
  STRONG,
  VERY_STRONG,
  NO_DATA,
}

enum FLAG {
  CORRECT,
  INCORRECT,
  FLAGGED_EASY,
  FLAGGED_DIFFICULT,
}

/* Api Response and RequestBodies */

/* ~~~ Environment ~~~ */
interface EnvironmentBase {
  title: string;
}

export interface GetEnvironment extends EnvironmentBase {
  id: number;
}

export interface GetFullEnvironment extends GetEnvironment {
  noteCollection: getNoteCollection;
  flashcardDecks: GetFlashcardDeck[];
  quizCollections: GetQuizCollection[];
  progressReport: GetProgressReport;
  tags: GetTag[];
}

export interface PostEnvironment {
  title: string;
}

export interface PatchEnvironment {
  title?: string;
}

/* ~~~ Note Collection ~~~ */
export interface getNoteCollection {
  id: number;
  environment: EnvironmentBase;
  notes: GetNote[];
}

/* ~~~ Note ~~~ */
interface NoteBase {
  title: string;
  content: string;
}
export interface GetNote extends NoteBase {
  id: number;
  noteCollectionId: number;
  environmentId: number;
  tag: GetTagBasic;
}

export interface PostNoteR extends NoteBase {
  noteCollectionId: number;
  tagId: number;
}

export interface PatchNoteRequest extends NoteBase {
  tagId?: number;
}

/* ~~~ Flashcard Deck ~~~ */
interface FlashcardDeckBase {
  title: string;
}

export interface GetFlashcardDeck extends FlashcardDeckBase {
  environment: GetEnvironment;
  id: number;
}

export interface GetFullFlashcardDeck extends FlashcardBase {
  id: string | number;
  flashcards: GetFlashcard[];
}

export interface PostFlashcardDeck extends FlashcardBase {
  environmentId: number;
}

export interface PatchFlashcardDeck {
  title?: string;
}

/* ~~~ Flashcard ~~~ */
interface FlashcardBase {
  title: string;
  content: string;
}

export interface GetFlashcard extends FlashcardBase {
  id: number;
  tag?: TagBase;
  status: STATUS;
}

export interface PostFlashcard extends FlashcardBase {
  flashcardDeckId: number;
  tagId: number;
  minimumDisplays: number;
}

export interface PatchFlashcard extends FlashcardBase {
  flag?: FLAG;
  tagId?: number;
}

/* ~~~ Quiz Collection ~~~ */
export interface GetQuizCollection {
  id: number;
  environmentId: number;
  title: string;
  quizList?: GetQuiz[];
}

/* ~~~ Quiz ~~~ */
interface QuizBase {
  id: number;
  title: string;
}

export interface GetQuiz extends QuizBase {
  quizCollectionId: number;
}

export interface GetFullQuiz extends GetQuiz {
  size: number;
  isFinal: boolean;
  questions: GetQuestion[];
}

export interface PostQuiz {
  quizCollectionId: number;
  title: string;
  size: number;
}

export interface PatchQuiz {
  title?: string;
  isFinal?: boolean;
}

/* ~~~ Question ~~~ */
interface QuestionBase {
  id: number;
  environmentId?: number;
  question: string;
  answers?: GetAnswer[];
}

export interface GetQuestion extends QuestionBase {
  quizId: number;
  tag: TagBase;
}

export interface PostQuestion {
  environmentId: number;
  title: string;
}

export interface PatchQuestion {
  question?: string;
  answerCount?: number;
  answers?: GetAnswer[];
  tagId?: number;
}

/* ~~~ Answer ~~~ */
interface AnswerBase {
  answer: string;
  isCorrect: boolean;
}

export interface GetAnswer extends AnswerBase {
  id: number;
}

export interface PatchAnswer {
  answer?: string;
  isCorrect?: boolean;
}

/* ~~~ Quiz Result ~~~ */
export interface GetQuizResult {
  id: number;
  answeredQuestions: QuestionBase[];
}

export interface PostQuizResult {
  quizId: number;
}

export interface SubmitQuizResult {
  id: number;
  score: number;
}

export interface SubmitQuizResultAnswer {
  questionId: number;
  answerIds: number[];
}

export interface PostQuizCollection {
  environmentId: number;
  title: string;
}

export interface PatchQuizCollection {
  title?: string;
}

/* ~~~ Progress Report ~~~ */
export interface GetProgressReport {
  id: number;
  environmentId: number;
  tags: detailedTag[];
  strength: detailedTag;
  weakness: detailedTag;
}

/* ~~~ Tag ~~~ */
interface TagBase {
  title: string;
}

export interface GetTagBasic extends TagBase {
  id: number;
}

export interface GetTag extends TagBase {
  id: number;
  seenCount: number;
  flaggedPositiveCount: number;
  environment: GetEnvironment;
  status: STATUS;
  percentage: number;
}
interface detailedTag {
  id: number;
  percentage: number;
  status: STATUS;
  title: string;
}

export interface PostTag {
  environmentId: number;
  title: string;
}

export interface PatchTag {
  title?: string;
  isFlaggedPositive?: boolean;
  reset?: boolean;
}
