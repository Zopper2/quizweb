'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function MenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <Menu className="w-5 h-5 mr-2 text-black dark:text-white" />
        <span className="text-black dark:text-white font-semibold">Menu</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
          <ul className="py-1 space-y-1">
            <li>
              <Link
                href="/user"
                className="block px-4 py-2 bg-yellow-200 dark:bg-gray-800 text-black dark:text-white font-bold"
              >
                User
              </Link>
            </li>
            <li>
              <Link
                href="/quiz"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
              >
                Quizzes
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
              >
                Categories
              </Link>
            </li>
            <li>
              <button
                onClick={() => console.log('Logout clicked')}
                className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}