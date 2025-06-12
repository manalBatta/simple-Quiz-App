import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/questions";

function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: "",
    difficulty: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleOptionChange = (idx, value) => {
    setForm((f) => {
      const options = [...f.options];
      options[idx] = value;
      return { ...f, options };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          setQuestions((qs) => qs.map((q) => (q.id === editId ? data : q)));
        } else {
          setQuestions((qs) => [...qs, data]);
        }
        resetForm();
      });
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      question: "",
      options: ["", "", "", ""],
      correct: "",
      difficulty: "",
      category: "",
    });
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setQuestions((qs) => qs.filter((q) => q.id !== id))
    );
  };

  const handleEdit = (q) => {
    setEditId(q.id);
    setForm({
      question: q.question,
      options: q.options,
      correct: q.correct,
      difficulty: q.difficulty,
      category: q.category,
    });
  };

  return (
    <div style={{ padding: "2rem", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", color: "#333" }}>Admin Page</h1>

      <h2 style={{ marginTop: "2rem", color: "#007bff" }}>Add New Question</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          maxWidth: "500px",
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <input
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Question"
          required
          style={{
            background: "#fff",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        {form.options.map((opt, idx) => (
          <input
            key={idx}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
            required
            style={{
              background: "#fff",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ))}
        <input
          name="correct"
          value={form.correct}
          onChange={handleChange}
          placeholder="Correct Answer"
          required
          style={{
            background: "#fff",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          placeholder="Difficulty (e.g. Easy, Medium, Hard)"
          required
          style={{
            background: "#fff",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          style={{
            background: "#fff",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            {editId ? "Update" : "Add"} Question
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#dc3545",
                color: "white",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={{ marginTop: "3rem", color: "#007bff" }}>Question List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map((q) => (
          <li
            key={q.id}
            style={{
              background: "#fff",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <b>{q.question}</b>
              <div style={{ fontSize: "0.9rem", color: "#555" }}>
                ({q.difficulty}, {q.category})
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleEdit(q)}>Edit</button>
              <button
                onClick={() => handleDelete(q.id)}
                style={{ backgroundColor: "#dc3545", color: "white" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
