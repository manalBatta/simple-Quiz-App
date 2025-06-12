import React from "react";

const ResultCard = ({ score, total, onRestart }) => (
  <div className="result-card">
    <h1 className="address">Quiz App</h1>

    <h2>Quiz Completed!</h2>
    <p className="score">
      You Scored {score} out of {total} .
    </p>
    <button onClick={onRestart}>Restart Quiz</button>
  </div>
);

export default ResultCard;
