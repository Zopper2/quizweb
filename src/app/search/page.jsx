'use client';
import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/quiz/categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const filtered = categories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input placeholder="Search category..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {filtered.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>
    </>
  );
}
