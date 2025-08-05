'use client';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import MenuButton from '../MenuButton/page';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Check if user is logged in by checking localStorage for a token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-700">
          Quizzis
        </Link>
              <MenuButton />
      
      </div>
    </header>
  );
}
