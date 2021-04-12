import {
  Card,
  CircularProgress,
  Typography,
} from "@material-ui/core";

export const Answer = ({
  data,
  answerIndex,
  makeChoice,
  disabled,
  isSelected,
}) => (
  <Card
    variant="outlined"
    className={makeChoice ? "answer-root clickable" : "answer-root"}
    onClick={makeChoice ? () => makeChoice(answerIndex) : undefined}
    style={
      disabled
        ? { opacity: 0.5 }
        : isSelected
        ? { borderWidth: "5px", borderColor: "#000" }
        : undefined
    }
  >
    {data.type === "image" ? (
      <img
        src={data.answers[answerIndex]}
        style={{ height: 200 }}
        alt="Answer"
      />
    ) : (
      <Typography variant="h4">
        {data.answers[answerIndex]}
      </Typography>
    )}
  </Card>
);

export const AnswersGrid = ({ data, makeChoice, answer }) => (
  <>
    <div className="answers-row">
      <Answer
        answerIndex={0}
        data={data}
        makeChoice={makeChoice}
        disabled={answer && data.answers[0] !== answer.choice}
        isSelected={answer && data.answers[0] === answer.choice}
      />
      <span style={{ width: "32px" }} />
      <Answer
        answerIndex={1}
        data={data}
        makeChoice={makeChoice}
        disabled={answer && data.answers[1] !== answer.choice}
        isSelected={answer && data.answers[1] === answer.choice}
      />
    </div>
    <div className="answers-row">
      <Answer
        answerIndex={2}
        data={data}
        makeChoice={makeChoice}
        disabled={answer && data.answers[2] !== answer.choice}
        isSelected={answer && data.answers[2] === answer.choice}
      />
      <span style={{ width: "32px" }} />
      <Answer
        answerIndex={3}
        data={data}
        makeChoice={makeChoice}
        disabled={answer && data.answers[3] !== answer.choice}
        isSelected={answer && data.answers[3] === answer.choice}
      />
    </div>
  </>
);

export const Answered = ({ data, answer }) => {
  return (
    <div>
      <Typography variant="h4">{data.question}</Typography>
      <span style={{ marginTop: "8px" }}>
        <CircularProgress color="primary" />
      </span>
      <AnswersGrid data={data} answer={answer} />
    </div>
  );
};
