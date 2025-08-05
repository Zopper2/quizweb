import { connectDB } from '@/lib/mongodb';
import Quiz from '@/models/Quiz';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    // Optional: Validate required fields
    if (
      !body.title ||
      !body.description ||
      !body.category ||
      typeof body.isFeatured === 'undefined' ||
      !body.questions ||
      !body.createdBy
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
  
    const quiz = await Quiz.create(body);
    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}