import { connectDB } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET() {
  await connectDB();
  const quizzes = await Quiz.find();
  return new Response(JSON.stringify(quizzes), { status: 200 });
}