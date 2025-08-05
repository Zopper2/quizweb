'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MenuButton from '@/app/components/MenuButton/page';

export default function CategoryQuizzesPage() {
  const { category } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    fetch(`/api/quiz/category/${category}`)
      .then(res => res.json())
      .then(data => {
        setQuizzes(data);
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
       <header className="sticky top-0 z-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-300 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  Quizzis
                </Link>
                <MenuButton />
                </div>
                
            </header>
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-6 capitalize">📂 {category} Quizzes</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
        </div>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No quizzes found in this category.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {quizzes.map((quiz: any) => (
            <Link key={quiz._id} href={`/quiz/${quiz._id}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-4 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold dark:text-white">{quiz.title}</h2>
                {quiz.isFeatured && (
                  <span className="text-sm text-yellow-600 font-semibold">🌟 Featured</span>
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
    </div>
  );
}
