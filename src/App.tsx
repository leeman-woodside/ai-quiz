import { Routes, Route, Link } from "react-router-dom";
import TopicPage from "./pages/TopicPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import "./App.css";

export default function App() {
  return (
    <>
      <nav style={{ padding: "8px 12px", borderBottom: "1px solid #eee" }}>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TopicPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </>
  );
}
