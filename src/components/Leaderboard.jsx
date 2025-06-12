import React, { useEffect, useState } from "react";

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/leaderboard")
      .then((res) => res.json())
      .then(setScores);
  }, []);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        background: "#f9f9f9",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#2d3a4b",
        }}
      >
        🏆 Leaderboard 🏆
      </h2>
      <table
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#e3e8ee", color: "#2d3a4b" }}>
            <th style={{ padding: "0.75rem" }}>#</th>
            <th style={{ padding: "0.75rem" }}>Score</th>
            <th style={{ padding: "0.75rem" }}>Date</th>
            <th style={{ padding: "0.75rem" }}>Category</th>
            <th style={{ padding: "0.75rem" }}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {scores.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  color: "#888",
                }}
              >
                No scores yet.
              </td>
            </tr>
          ) : (
            scores.map((s, i) => (
              <tr
                key={s.id || i}
                style={{
                  background: i % 2 === 0 ? "#f7fafc" : "#fff",
                  fontWeight: i === 0 ? "bold" : "normal",
                  color: i === 0 ? "#007bff" : "#2d3a4b",
                }}
              >
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {i + 1}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {s.score}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {new Date(s.date).toLocaleString()}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {s.category}
                </td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>
                  {s.difficulty}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
