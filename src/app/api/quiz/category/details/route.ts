// app/api/quiz/category/details/route.ts
import { connectDB } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';


export async function GET() {
  await connectDB();
  const categories = await Quiz.distinct('category');
  const data = categories.map(cat => ({
    name: cat,
    description: `Explore quizzes in ${cat}`,
  }));
  return new Response(JSON.stringify(data), { status: 200 });
}