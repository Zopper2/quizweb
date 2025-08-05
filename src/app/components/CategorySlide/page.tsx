'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const categoryImages: Record<string, string> = {
  Books: '/categoriesimage/books.webp',
  Entertainment: '/categoriesimage/Entertainment2.webp',
  Gaming: '/categoriesimage/gaming.webp',
  Maths: '/categoriesimage/maths.webp',
  Trivia: '/categoriesimage/Trivia.webp',
  Geography: '/categoriesimage/Geography.webp',
  Social_Media: '/categoriesimage/Social.webp',
  History: '/categoriesimage/history.webp',
  Food_Drinks: '/categoriesimage/food-drinks.webp',
  Technology: '/categoriesimage/technology.webp',

};

interface Category {
  name: string;
  description: string;
  imageUrl: string;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/quiz/category/details')
      .then(res => res.json())
      .then(data => {
        const enhanced = data.map((cat: { name: string; description: string }) => ({
          ...cat,
          imageUrl: categoryImages[cat.name] || '/categoriesimage/default.webp',
        }));
        setCategories(enhanced);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">Explore Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <Link key={idx} href={`/categories/${cat.name}`}>
            <div
              className="rounded-xl overflow-hidden shadow-lg h-60 bg-cover bg-center relative hover:scale-105 transition-transform"
              style={{ backgroundImage: `url(${cat.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-sm text-gray-200 line-clamp-2">{cat.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}