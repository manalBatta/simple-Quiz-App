import React, { useReducer, useState, useEffect } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import ResultCard from "./components/ResultCard";
import { quizReducer, initialState } from "./reducers/quizReducer";
import AdminPage from "./components/AdminPage";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  const { currentQuestionIndex, score, showResults, previousScore } = state;

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((q) => q.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    if (!quizStarted || showResults) return;
    if (timeLeft === 0) {
      dispatch({ type: "NEXT_QUESTION", totalQuestions: questions.length });
      setTimeLeft(15);
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, showResults]);

  useEffect(() => {
    if (quizStarted) {
      setLoading(true);
      let url = "http://localhost:5000/questions";
      const params = [];
      if (selectedDifficulty) params.push(`difficulty=${selectedDifficulty}`);
      if (selectedCategory) params.push(`category=${selectedCategory}`);
      if (params.length) url += "?" + params.join("&");

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data);
          dispatch({ type: "SET_QUESTIONS" });
          setLoading(false);
        });
    }
  }, [quizStarted, selectedDifficulty, selectedCategory]);

  const handleAnswer = (option) => {
    dispatch({
      type: "ANSWER",
      payload: option,
      correct: questions[currentQuestionIndex].correct,
    });
    dispatch({ type: "NEXT_QUESTION", totalQuestions: questions.length });
    setTimeLeft(15);
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART" });
    setQuizStarted(false);
    setTimeLeft(15);
  };

  useEffect(() => {
    if (showResults && questions.length > 0) {
      fetch("http://localhost:5000/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          date: new Date().toISOString(),
          category: selectedCategory || "All",
          difficulty: selectedDifficulty || "All",
        }),
      });
    }
  }, [showResults]);

  // Page switching logic
  return (
    <div>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <div className="page-content">
        {currentPage === "admin" && <AdminPage />}
        {currentPage === "leaderboard" && <Leaderboard />}
        {currentPage === "quiz" &&
          (quizStarted ? (
            loading ? (
              <div>Loading questions...</div>
            ) : showResults ? (
              <ResultCard
                score={score}
                total={questions.length}
                onRestart={handleRestart}
              />
            ) : (
              <div className="quiz-container">
                <h1 className="address">Quiz App</h1>
                <div className="quiz-header">
                  <p>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                  <p>Time Left: {timeLeft}s</p>
                </div>
                {questions.length > 0 &&
                  currentQuestionIndex < questions.length && (
                    <QuestionCard
                      questionObj={questions[currentQuestionIndex]}
                      onAnswer={handleAnswer}
                    />
                  )}
              </div>
            )
          ) : (
            <div className="start-screen">
              <h1>Quiz App</h1>
              <div style={{ marginBottom: 16 }}>
                <label>
                  Difficulty:&nbsp;
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </label>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>
                  Category:&nbsp;
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button onClick={() => setQuizStarted(true)}>Start Quiz</button>
              {previousScore !== null && <p>Previous score: {previousScore}</p>}
            </div>
          ))}
        {currentPage === "home" && (
          <div
            style={{ background: "#f2f2f2", height: "100vh", padding: "2rem" }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
              }}
            >
              Welcome to the Quiz App
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
