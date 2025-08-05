'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MenuButton from '../components/MenuButton/page';

export const Quizz =() => {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const quizzesPerPage = 6;

  useEffect(() => {
    fetch('/api/quiz')
      .then(res => res.json())
      .then(data => setQuizzes(data));

    fetch('/api/quiz/category')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const filtered = quizzes.filter(q =>
    (selectedCategory ? q.category === selectedCategory : true) &&
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * quizzesPerPage,
    page * quizzesPerPage
  );

  const totalPages = Math.ceil(filtered.length / quizzesPerPage);


  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-300 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            Quizzis
          </Link>
          <MenuButton />
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-6 text-center">🧠 All Quizzes</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-6 justify-center">
        <input
          type="text"
          placeholder="Search quiz..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-64 bg-white dark:bg-gray-700 dark:text-white shadow-sm"
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-52 bg-white dark:bg-gray-700 dark:text-white shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Quiz Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map(quiz => (
          <Link key={quiz._id} href={`/quiz/${quiz._id}`}>
            <div className="p-5 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-md
              transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div>
                <h3 className="text-lg font-semibold">{quiz.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Category: {quiz.category}</p>
              </div>
              {quiz.isFeatured && (
                <span className="text-sm text-yellow-600 font-semibold mt-2 block">
                  🌟 Featured
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded font-medium ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No quizzes found.</p>
      )}
    </div>
  );
}
