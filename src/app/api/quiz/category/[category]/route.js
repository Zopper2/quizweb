import { connectDB } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET(req, { params }) {
  await connectDB();
  const { category } = params;
  const quizzes = await Quiz.find({ category });
  return new Response(JSON.stringify(quizzes), { status: 200 });
}