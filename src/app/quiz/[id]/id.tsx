'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface QuizData {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  isFeatured: boolean;
  category: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export const QuizP = ({ params }: { params: Promise<{ id: string }> }) => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setQuizId(resolvedParams.id);
    })();
  }, [params]);

  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quiz/${quizId}`);
        if (!res.ok) throw new Error("Quiz not found");
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        console.error(err);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId, router]);

  if (loading) return <div className="text-center py-10">Loading quiz...</div>;
  if (!quiz) return <div className="text-center py-10 text-red-500">Quiz not found.</div>;

  const question = quiz.questions[currentQuestion];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowAnswer(true);
    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
        <p className="text-xl mb-6">Quiz Finished!</p>
        <p className="text-lg font-semibold mb-2">Your Score: {score} / {quiz.questions.length}</p>
        <button
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => router.push('/')}
        >
          Go Home
        </button>
        <p> Regiester for more upcoming quizzes </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-gray-600 mb-8">Category: {quiz.category}</p>
      <div className="transition-colors duration-300 bg-white dark:bg-black text-black dark:text-white">
        <h2 className="font-semibold mb-2">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </h2>
        <p className="mb-4">{question.question}</p>
        <ul className="space-y-4">
          {question.options.map((opt, i) => (
            <li
              key={i}
              className={`cursor-pointer p-2 border rounded hover:bg-gray-100
                ${selectedOption === opt
                  ? opt === question.answer
                    ? 'bg-green-500 border-green-500'
                    : 'bg-red-500 border-red-500'
                  : ''
                }
                ${showAnswer && opt === question.answer && selectedOption !== opt ? 'bg-green-500 border-green-300' : ''}
              `}
              onClick={() => !showAnswer && handleOptionClick(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
        {showAnswer && (
          <button
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={handleNext}
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>
      <div className="text-right text-gray-500">Score: {score}</div>
    </div>
  );
}
const saveQuizResult = async (quizId: string, score: number, total: number) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await fetch("/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quizId, score, total }),
    });
  } catch (err) {
    console.error("Failed to save quiz result:", err);
  }
};