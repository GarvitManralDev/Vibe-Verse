import { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";

export default function QuizModal({ category, onClose, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [vibeScore, setVibeScore] = useState(0);
  const [crazyScore, setCrazyScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("Vibetoken");
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions/${
            category.ServerName
          }`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (quizComplete || showFeedback) return;
    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizComplete, showFeedback]);

  useEffect(() => {
    if (quizComplete) {
      onComplete({ vibeScore, crazyScore });
      onClose(); // Immediately close modal after quiz is complete
    }
  }, [quizComplete, onComplete, vibeScore, crazyScore, onClose]);

  const handleAnswer = (index) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index !== null) {
      const { vibe_score: v, crazy_score: c } =
        questions[currentQuestion].options[index];
      setVibeScore((prev) => prev + v);
      setCrazyScore((prev) => prev + c);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
        setShowFeedback(false);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const progressPercentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white p-10 rounded-xl shadow-lg">
          Loading quiz...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl shadow-pink-900/20 animate-fadeIn relative">
        <div className={`p-4 bg-gradient-to-r ${category.color}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                {category.icon}
              </div>
              <h3 className="font-bold text-white text-xl">
                {category.name} Quiz
              </h3>
            </div>
            {!quizComplete && (
              <button
                onClick={onClose}
                className="bg-black/30 text-white p-1.5 rounded-full hover:bg-black/50 transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-800 h-1.5">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div
              className={`flex items-center ${
                timeLeft < 5 ? "text-red-500" : "text-gray-300"
              }`}
            >
              <Clock size={16} className="mr-1" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          <h2 className="text-xl text-white font-medium mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedAnswer === index
                    ? "bg-purple-500/20 border-2 border-purple-500"
                    : "bg-gray-800 border-2 border-gray-700 hover:border-gray-600"
                }`}
              >
                <span className="text-gray-200">{opt.text}</span>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-4 p-3 rounded-lg bg-purple-500/10 text-purple-300">
              {selectedAnswer !== null ? (
                <>
                  +
                  {
                    questions[currentQuestion].options[selectedAnswer]
                      .vibe_score
                  }{" "}
                  Vibe, +
                  {
                    questions[currentQuestion].options[selectedAnswer]
                      .crazy_score
                  }{" "}
                  Crazy
                </>
              ) : (
                <>No answer selected. +0 Vibe, +0 Crazy</>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
