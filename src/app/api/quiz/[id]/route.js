import { connectDB } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(req, context) {
  await connectDB();

  try {
    const params = await context.params;
    const id = params?.id;

    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Quiz ID' }, { status: 400 });
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }
    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz' }, { status: 500 });
  }
}