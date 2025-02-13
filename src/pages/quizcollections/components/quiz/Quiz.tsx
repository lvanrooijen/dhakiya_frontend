import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderBar } from 'src/components/headerbar/HeaderBar';
import { AxiosClient } from 'src/services/AxiosClient';
import type { GetFullQuiz } from 'src/types/api';
import { Question } from '../question/Question';
import './Quiz.css';

export const Quiz = () => {
  const { quizId } = useParams();
  const [quiz, setquiz] = useState<GetFullQuiz | null>(null);

  const getQuiz = () => {
    AxiosClient.get(`quizzes/${quizId}`)
      .then((response: GetFullQuiz) => {
        setquiz(response);
        console.log('Quiz: ', response);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getQuiz();
  }, []);

  if (!quiz) return <div>Loading...</div>;

  return (
    <>
      <HeaderBar label={quiz.title} />
      <Question
        questionNr={0}
        totalQuestions={quiz.size}
        question={quiz.questions[0]}
      />
    </>
  );
};
