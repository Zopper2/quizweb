// /src/app/api/user/profile/route.js (or route.ts)
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/utils/jwt';

export async function GET(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return new Response(JSON.stringify({ error: 'No token provided' }), { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).populate('quizStats.quizId');
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        username: user.username,
        email: user.email,
        quizStats: user.quizStats,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
  }
}
