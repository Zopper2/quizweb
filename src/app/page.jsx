'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import './styles/styles.css'; // Assuming you have a styles.css for global styles
import MenuButton from './components/MenuButton/page';
import CategorySlider from './components/CategorySlide/page';


export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Set mounted state to true after first render
    fetch('/api/quiz/category')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);

    fetch('/api/quiz/featured')
      .then(res => res.json())
      .then(data => {
        console.log('Featured quizzes:', data);
        setFeaturedQuizzes(Array.isArray(data) ? data : []);
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
      })
      .catch(console.error);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  if (!hasMounted) return null; // prevent mismatch during hydration

  return (
    <main className="min-h-screen text-gray-800 relative">
      {/* Dots background */}
      <div className="raining-dots-bg">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">Quizzis</h1>

          <nav className="flex items-center gap-4">

            {isLoggedIn ? (
              <>
                <Link href="/user" title="Profile">
                  <UserCircle className="w-6 h-6 text-purple-700 hover:text-purple-900 transition" />
                </Link>
                <Link
                  href="/logout"
                  className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Logout
                </Link>
                <MenuButton />
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      {/* HERO SECTION */}
      <section className="py-16 text-center bg-purple-50">
        <h2 className="text-4xl font-bold mb-4">Welcome to Quizzis</h2>
        <p className="text-gray-600 text-lg">Test your knowledge across categories and have fun!</p>
      </section>

      {/* CATEGORIES */}
      <CategorySlider categories={categories} />

      {/* FEATURED QUIZZES */}

      <section className="py-12 max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-bold mb-6">Quiz Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.length === 0 ? (
            <p className="text-gray-500">No categories found</p>

          ) : (
            categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/categories/${cat}`}
                className="bg-white p-4 shadow-md rounded hover:scale-105 transform transition"
              >
                {cat}
              </Link>
            ))
          )}
        </div>
      </section>

      {/* FEATURED QUIZZES */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-bold mb-6">Featured Quizzes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredQuizzes.length === 0 ? (
            <p className="text-gray-500">No featured quizzes found</p>
          ) : (
            featuredQuizzes.map((quiz, idx) => (
              <Link
                key={quiz._id}
                href={`/quiz/${quiz._id}`}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
              >
                <h4 className="text-lg font-bold mb-2">{quiz.title}</h4>
                <p className="text-sm text-gray-500 mb-1">Category: {quiz.category}</p>
                <p className="text-sm text-gray-400">Created by: {quiz.createdBy}</p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* FOOTER / ABOUT */}
      <footer className="bg-white py-10 mt-16 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="text-xl font-semibold mb-2">About This Website</h4>
          <p className="text-gray-600 mb-4">

            Welcome to Quizzis Website – your ultimate destination for fun, learning, and brain-challenging quizzes!

            We are a platform designed to make learning exciting and interactive. Whether you're a student, a trivia lover, or just looking to test your knowledge, we’ve got you covered with a wide variety of quiz categories to choose from.
          </p>
          <p className="text-gray-600 mb-4">
            Our mission is to provide a user-friendly and engaging experience that allows you to explore different topics</p>
          <p>
            🔍 What We Offer:
            Quizzes across multiple categories – General Knowledge, Science, Technology, History, Entertainment, and more.

            Featured and trending quizzes to keep you engaged.

            A clean and user-friendly interface that works across all devices.

            Regular updates with new and challenging questions.</p>
          <p>

            At Quizzis, we believe learning should be fun, engaging, and accessible to everyone. So dive in, challenge yourself, and see how much you really know!


          </p>
          <h4 className="text-xl font-semibold mb-2">About Us </h4>
          <p className="text-gray-600 mb-4">
            We are a passionate team of quiz enthusiasts dedicated to creating a platform that not only tests your knowledge but also helps you learn new things in a fun way. Our quizzes are designed to be informative ?</p>
          <p className="text-sm text-gray-400">Developed by <strong>Quizzis</strong> ❤️ | &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}