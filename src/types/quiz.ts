export type Difficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface Quiz {
  topic: string;
  questions: QuizQuestion[];
}

export interface UserAnswer {
  questionId: string;
  selectedIndex: number;
}

export interface GenerateQuizParams {
  topic: string;
  numQuestions?: number;
  optionsPerQuestion?: number;
  difficulty?: Difficulty;
}
