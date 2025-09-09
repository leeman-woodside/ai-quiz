import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateMockQuiz } from "../services/mockQuiz";
import type { UserAnswer } from "../types/quiz";
import { generateQuizFromBackend } from "../lib/quizApi";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function QuizPage() {
  const query = useQuery();
  const topic = query.get("topic") || "General Knowledge";
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState(generateMockQuiz({ topic }));

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setAnswers([]);

    generateQuizFromBackend({ topic, numQuestions: 5, optionsPerQuestion: 4 })
      .then((res) => {
        if (cancelled) return;
        setQuiz(res.quiz);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Using local mock due to backend error");
        setQuiz(generateMockQuiz({ topic }));
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [topic]);

  function selectAnswer(questionId: string, selectedIndex: number) {
    setAnswers((prev) => {
      const others = prev.filter((a) => a.questionId !== questionId);
      return [...others, { questionId, selectedIndex }];
    });
  }

  function submit() {
    navigate("/results", {
      state: { quiz, answers },
    });
  }

  const allAnswered = quiz.questions.every((q) =>
    answers.some((a) => a.questionId === q.id)
  );

  if (loading) {
    return (
      <div style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
        <p>Generating quiz for topic: {topic}…</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Topic: {quiz.topic}</h2>
      {error && (
        <div style={{ color: "#b45309", marginBottom: 8 }}>{error}</div>
      )}
      {quiz.questions.map((q, idx) => {
        const picked = answers.find(
          (a) => a.questionId === q.id
        )?.selectedIndex;
        return (
          <div
            key={q.id}
            style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd" }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              {idx + 1}. {q.prompt}
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={picked === i}
                    onChange={() => selectAnswer(q.id, i)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={submit} disabled={!allAnswered}>
          Submit
        </button>
      </div>
    </div>
  );
}
