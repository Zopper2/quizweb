'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Optional: call backend (not necessary if no blacklist)
    fetch('/api/auth/logout', {
      method: 'POST',
    }).catch(console.error);

    // Redirect to login page
    router.push('/login');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-xl text-gray-700">
      Logging out...
    </div>
  );
}
