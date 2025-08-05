import { connectDB } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function GET() {
  await connectDB();
  const categories = await Quiz.distinct('category');
  return new Response(JSON.stringify(categories), { status: 200 });
}