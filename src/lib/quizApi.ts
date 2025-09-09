import type { GenerateQuizParams, Quiz } from "../types/quiz";

export interface GenerateQuizResponse {
  quiz: Quiz;
  model: string;
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function generateQuizFromBackend(
  payload: GenerateQuizParams
): Promise<GenerateQuizResponse> {
  const res = await fetch(`${API_BASE}/api/generate-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Backend error ${res.status}`);
  }
  return res.json();
}
