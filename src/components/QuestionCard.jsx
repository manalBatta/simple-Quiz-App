import React from "react";

const QuestionCard = ({ questionObj, onAnswer }) => {
  console.log("QuestionCard", questionObj);
  return (
    <div className="question-card">
      <div className="question">
        <h3>{questionObj.question}</h3>
        <ul className="options">
          {questionObj.options.map((option, index) => (
            <li>
              <button key={index} onClick={() => onAnswer(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
