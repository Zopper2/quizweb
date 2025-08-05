'use server';

import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

function isValidEmail(email) {
  // Must contain at least one letter, one number, and end with @gmail.com
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d._%+-]+@gmail\.com$/.test(email);
}

function isValidPassword(password) {
  // At least 8 chars, one lowercase, one uppercase, one number, one special char
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email format. Email must contains text, number and @gmail.com in the end.' }), { status: 400 });
    }

    if (!isValidPassword(password)) {
      return new Response(JSON.stringify({ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.' }), { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
  } catch (err) {
    console.error('[REGISTER_ERROR]', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}