const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(filename, "utf-8"));
}
function writeJSON(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

// GET /questions (with optional filters)
app.get("/questions", (req, res) => {
  let questions = readJSON("questions.json");
  const { difficulty, category } = req.query;
  if (difficulty)
    questions = questions.filter((q) => q.difficulty === difficulty);
  if (category) questions = questions.filter((q) => q.category === category);
  res.json(questions);
});

// POST /questions
app.post("/questions", (req, res) => {
  const questions = readJSON("questions.json");
  const newQuestion = { id: Date.now(), ...req.body };
  questions.push(newQuestion);
  writeJSON("questions.json", questions);
  res.status(201).json(newQuestion);
});

// PUT /questions/:id
app.put("/questions/:id", (req, res) => {
  let questions = readJSON("questions.json");
  const idx = questions.findIndex((q) => q.id == req.params.id);
  if (idx === -1) return res.status(404).send("Not found");
  questions[idx] = { ...questions[idx], ...req.body };
  writeJSON("questions.json", questions);
  res.json(questions[idx]);
});

// DELETE /questions/:id
app.delete("/questions/:id", (req, res) => {
  let questions = readJSON("questions.json");
  questions = questions.filter((q) => q.id != req.params.id);
  writeJSON("questions.json", questions);
  res.status(204).send();
});

// POST /scores
app.post("/scores", (req, res) => {
  const scores = readJSON("scores.json");
  const newScore = { id: scores.length + 1, ...req.body };
  scores.push(newScore);
  writeJSON("scores.json", scores);
  res.status(201).json(newScore);
});

// GET /leaderboard
app.get("/leaderboard", (req, res) => {
  const scores = readJSON("scores.json");
  const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json(topScores);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
