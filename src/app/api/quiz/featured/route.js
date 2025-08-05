import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function GET() {
  try {
    await connectDB();
    const featuredQuizzes = await Quiz.find({ isFeatured: true }).limit(10);
    return new Response(JSON.stringify(featuredQuizzes), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch featured quizzes" }), { status: 500 });
  }
}