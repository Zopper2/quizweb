'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MenuButton from '../components/MenuButton/page';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/quiz/category/')
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) && typeof data[0] === 'object'
          ? data.map((cat: any) => cat.name)
          : data
        );
        setLoading(false);
      });
  }, []);

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
      <h1 className="text-3xl font-bold mb-6">📚 Quiz Categories</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {categories.map((category, i) => (
            <Link key={i} href={`/categories/${category}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-4 border rounded-md shadow bg-white dark:bg-gray-800 text-black dark:text-white hover:shadow-lg transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold capitalize">{category}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Explore {category} quizzes
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
    </div>
  );
}
