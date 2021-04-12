import { Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { AnswersGrid } from "./Answer";
import { useInterval } from "../Common/useInterval";

const TIME = 30;

export const Question = ({ data, chooseAnswer }) => {
  const [sound, setSound] = useState();
  const [startTime, setStartTime] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(TIME);
  const makeChoice = useRef();

  useEffect(() => {
    makeChoice.current = (answerIndex) => {
      chooseAnswer({
        questionId: data.id,
        choice: data.answers[answerIndex],
        time: new Date().getTime() - startTime,
      });
    };
  }, [chooseAnswer, data.answers, data.id, startTime]);

  useEffect(() => {
    return () => {
      if (sound) {
        console.log("Pausing Sound");
        sound.pause();
      }
    };
  }, [sound]);

  useEffect(() => {
    const sound = new Audio(data.audio_url);
    setSound(sound);
    sound.play();
  }, [data.audio_url]);

  useInterval(() => {
    let actualStartTime = startTime;
    if (startTime === -1) {
      actualStartTime = new Date().getTime();
      setStartTime(actualStartTime);
    }
    const newTimeLeft = Math.max(
      parseInt(
        TIME - (new Date().getTime() - actualStartTime) / 1000
      ),
      0
    );
    setTimeLeft(newTimeLeft);
    if (newTimeLeft === 0) {
      // No time left, choose first answer with max time (score will be 0)
      chooseAnswer({
        questionId: data.id,
        choice: data.answers[0],
        time: TIME * 1000,
      });
    }
  }, 1000);

  return (
    <div>
      <Typography variant="h4">{data.question}</Typography>
      <Typography variant="h3">{timeLeft}</Typography>
      <AnswersGrid data={data} makeChoice={makeChoice.current} />
    </div>
  );
};
