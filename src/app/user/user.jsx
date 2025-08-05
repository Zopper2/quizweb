'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './user.css';

export const UserP = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Error fetching user:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleSolveQuiz = () => {
    router.push('/categories'); // Change to actual quiz route if needed
  };

  if (!user) return <div className="p-6 text-gray-500">Loading user info...</div>;

  return (
    <main className="profile-background min-h-screen p-8 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2 text-purple-700">👋 Hello, {user.username}</h1>
        <p className="text-md text-gray-600 mb-6">Email: {user.email}</p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleSolveQuiz}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            📝 Solve Quiz
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </main>
  );
}
