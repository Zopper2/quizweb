// src/models/User.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  quizStats: [quizSchema]
});

export default mongoose.models.User || mongoose.model('User', userSchema);
