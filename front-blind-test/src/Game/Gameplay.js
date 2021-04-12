import { useEffect, useRef, useState } from "react";
import { Answered } from "./Answer";
import { Question } from "./Question";

export const Gameplay = ({ questions, finishGame }) => {
  // answers: { questionId, choice, time }
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerTimeout, setAnswerTimeout] = useState(null);
  const endGame = useRef();

  const currentQuestion = questions[currentQuestionIndex];

  const nextQuestion = () => {
    if (questions.length - 1 > currentQuestionIndex) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endGame.current();
    }
  };

  const chooseAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setAnswerTimeout(setTimeout(() => nextQuestion(), 5000));
  };

  useEffect(() => {
    endGame.current = () => finishGame(answers);
  }, [answers, finishGame]);

  useEffect(() => {
    console.log("Gameplay init");
    return () => {
      console.log("Gameplay destroy");
      if (answerTimeout) clearTimeout(answerTimeout);
    };
  }, [answerTimeout]);

  return answers[currentQuestionIndex] ? (
    <Answered
      data={currentQuestion}
      answer={answers[currentQuestionIndex]}
    />
  ) : (
    <Question
      data={currentQuestion}
      chooseAnswer={(a) => chooseAnswer(a)}
    />
  );
};
