import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Difficulty } from "../types/quiz";

export default function TopicPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const navigate = useNavigate();

  function startQuiz() {
    const trimmed = topic.trim();
    if (!trimmed) return;
    const params = new URLSearchParams({
      topic: trimmed,
      difficulty,
    });
    navigate(`/quiz?${params.toString()}`);
  }

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Ai-Powered Brain Knowledge Quiz</h1>
      <p>Enter a topic to generate a quiz:</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startQuiz();
        }}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Neural Networks"
          style={{ flex: 1, padding: 8 }}
          aria-label="Topic"
        />
        <select
          aria-label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          style={{ padding: 8 }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          type="submit"
          disabled={topic.trim().length === 0}
          style={{ padding: "8px 12px" }}
        >
          Start
        </button>
      </form>
    </div>
  );
}
