import type { GenerateQuizParams, Quiz, QuizQuestion } from "../types/quiz";

function seededRandom(seed: string): () => number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateMockQuiz(params: GenerateQuizParams): Quiz {
  const topic = params.topic.trim() || "General Knowledge";
  const numQuestions = params.numQuestions ?? 5;
  const optionsPerQuestion = params.optionsPerQuestion ?? 4;
  const rand = seededRandom(topic.toLowerCase());

  const questions: QuizQuestion[] = Array.from({ length: numQuestions }).map(
    (_, idx) => {
      const correctIndex = Math.floor(rand() * optionsPerQuestion);
      const options = Array.from({ length: optionsPerQuestion }).map((__, i) =>
        i === correctIndex
          ? `${topic} fact ${idx + 1}`
          : `${topic} distractor ${idx + 1}.${i + 1}`
      );
      return {
        id: `q${idx + 1}`,
        prompt: `Question ${
          idx + 1
        }: Which statement best relates to ${topic}?`,
        options,
        correctIndex,
        explanation: `The correct option mentions a core ${topic} idea.`,
      };
    }
  );

  return { topic, questions };
}
