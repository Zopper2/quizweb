'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/api/auth/login/login.css'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      return setError(err.message || 'Login failed');
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    router.push('/');
  };

  return (
    <div className="login-background min-h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded transition duration-200">
            Login
          </button>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-600 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
