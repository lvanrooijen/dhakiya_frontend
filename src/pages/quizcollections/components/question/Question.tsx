import { useState } from 'react';
import { Button } from 'src/components/button/Button';
import { TagSelect } from 'src/components/tagselect/TagSelect';
import type { GetQuestion } from 'src/types/api';
import './Question.css';

export const Question: React.FC<QuestionProps> = ({
  questionNr,
  totalQuestions,
  question,
}) => {
  const [answerCount, setAnswerCount] = useState<number>(4);
  let answerArr = Array(answerCount).fill(null);

  const connectNote = () => {
    console.log('Connecting note to this question');
    // TODO actually connect it...
  };

  return (
    <div className="question-container">
      <div className="question-top-section">
        <TagSelect isEnabled={true} />
        <Button label={'Connect note'} handleClick={connectNote} />
        <textarea placeholder="Type your question here..." />
      </div>

      <div>
        <p>
          Question {questionNr} of {totalQuestions}
        </p>
        <div>
          <label htmlFor="answerAmount">Answers:</label>
          <input type="number" name="answerAmount" />
        </div>
        {/* TODO uitvogelen hoe dit te doen */}
        {answerArr.fill(null).map((_, index) => (
          <div key={index}>
            <input type="checkbox" name="isCorrect" />
            <input type="text" name="answer" />
          </div>
        ))}
      </div>

      <div></div>

      <div>
        <Button label={'previous'} />
        <Button label={'next'} />
      </div>
    </div>
  );
};

interface QuestionProps {
  questionNr: number;
  totalQuestions: number;
  question: GetQuestion;
}
