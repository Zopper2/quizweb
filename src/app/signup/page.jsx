'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import VanillaTilt from 'vanilla-tilt';
import '@/app/api/auth/register/register.css'; // Assuming you have a CSS file for styles

export default function RegisterPage() {
  const router = useRouter();
  const cardRef = useRef(null);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setSuccess('User registered successfully!');
      setForm({ username: '', email: '', password: '' });

      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
      });
    }
  }, []);

  return (
    <div className="register-background min-h-screen flex items-center justify-center p-4">
      <form
        ref={cardRef}
        onSubmit={handleSubmit}
        className="glass-card w-full max-w-md p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="text-black w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="text-black w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="text-black w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <p className='text-black'>Don't forget the password</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded transition duration-300"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}
