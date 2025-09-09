import { useLocation, useNavigate } from "react-router-dom";
import type { Quiz, UserAnswer } from "../types/quiz";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation() as {
    state: { quiz: Quiz; answers: UserAnswer[] };
  };
  const quiz = location.state?.quiz;
  const answers = location.state?.answers ?? [];

  if (!quiz) {
    return (
      <div style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
        <p>No quiz data. Start from the home page.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const correctCount = quiz.questions.reduce((acc, q) => {
    const picked = answers.find((a) => a.questionId === q.id)?.selectedIndex;
    return acc + (picked === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Results for topic: {quiz.topic}</h2>
      <p>
        Score: {correctCount}/{quiz.questions.length}
      </p>

      {quiz.questions.map((q, idx) => {
        const picked = answers.find(
          (a) => a.questionId === q.id
        )?.selectedIndex;
        const isCorrect = picked === q.correctIndex;
        return (
          <div
            key={q.id}
            style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd" }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              {idx + 1}. {q.prompt}
            </div>
            <div style={{ marginBottom: 6 }}>
              Your answer: {picked != null ? q.options[picked] : "—"}{" "}
              {isCorrect ? "✅" : "❌"}
            </div>
            {!isCorrect && (
              <div>Correct answer: {q.options[q.correctIndex]}</div>
            )}
            {q.explanation && (
              <div style={{ color: "#555" }}>{q.explanation}</div>
            )}
          </div>
        );
      })}

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => navigate("/")}>New Topic</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
