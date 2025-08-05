import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  answer: { type: String, required: true }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  questions: [QuestionSchema],
  createdBy: { type: String, required: true }
});

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
