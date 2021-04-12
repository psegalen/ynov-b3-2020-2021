import {
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../Common/api";
import { incrementPlayerNbPlayed } from "../User/userEffects";
import "./Game.css";
import { Gameplay } from "./Gameplay";

export const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const player = useSelector((state) => state.user.player);
  const dispatch = useDispatch();
  const shuffleArray = (values) => {
    const array = [...values];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  const getNewGame = () => {
    // Call /questions on the API
    setIsLoading(true);
    api.getQuestions().then((result) => {
      console.log(result);
      if (result === null) {
        // There was an error
        alert("Error");
      } else {
        setAnswers([]);
        setScore(-1);
        const questionsWithShuffledAnswers = [];
        result.forEach((q) => {
          questionsWithShuffledAnswers.push({
            ...q,
            answers: shuffleArray(q.answers),
          });
        });
        setQuestions(questionsWithShuffledAnswers);
      }
      setIsLoading(false);
    });
  };
  const finishGame = async (answers) => {
    const score = await api.submitAnswers(answers);
    setScore(score || 0);
    setAnswers(answers);
    setQuestions([]);
    console.log("Score:", score);
    dispatch(incrementPlayerNbPlayed());
  };
  return (
    <div className="page-root">
      <Card className="game-root">
        {player && !isLoading ? (
          <div className="game-container">
            {answers && answers.length > 0 ? (
              <div>
                <Typography variant="h2">
                  Votre score : <strong>{score}</strong>
                </Typography>
                <br />
                <Typography variant="h3">
                  Merci d'avoir joué
                </Typography>
                <Button
                  variant="contained"
                  onClick={getNewGame}
                  className="new-game-button"
                  color="primary"
                >
                  Nouvelle partie
                </Button>
              </div>
            ) : questions && questions.length > 0 ? (
              <Gameplay
                questions={questions}
                finishGame={finishGame}
              />
            ) : (
              <div>
                <Typography variant="h3">Jouer</Typography>
                <Button
                  variant="contained"
                  onClick={getNewGame}
                  className="new-game-button"
                  color="primary"
                >
                  Nouvelle partie
                </Button>
              </div>
            )}
          </div>
        ) : (
          <CircularProgress color="primary" />
        )}
      </Card>
    </div>
  );
};
