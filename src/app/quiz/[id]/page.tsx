import { QuizP } from "./id";

export const metadata = {
  title: 'Quiz solution',
  description: 'View and take quizzes on various topics',
};

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  return <QuizP params={params} />;
}