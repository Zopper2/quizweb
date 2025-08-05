// src/app/api/user/quiz-result/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const body = await req.json();
    const { quizId, score, total } = body;

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.quizStats.push({ quizId, score, total });
    await user.save();

    return NextResponse.json({ message: 'Stats updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token or server error' }, { status: 500 });
  }
}
