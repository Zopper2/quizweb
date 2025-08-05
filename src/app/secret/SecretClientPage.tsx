'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SecretClientPage() {
  const searchParams = useSearchParams();
  const [accessGranted, setAccessGranted] = useState(false);
  const expectedToken = process.env.NEXT_PUBLIC_SECRET_PAGE_TOKEN;


  useEffect(() => {
    const token = searchParams.get('token');
    if (token === expectedToken) {
      setAccessGranted(true);
    }
  }, [searchParams]);

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-600 font-bold">
        Access Denied 🚫
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black text-white bg-cover bg-center"
      style={{
        backgroundImage: `url('./secret/secret.jpg')`, // 👈 Replace this URL with your actual .jpeg image
      }}
    >
      <div className="text-center bg-black/60 p-6 rounded-xl">
        <h1 className="text-4xl font-bold mb-6">🔞 Tharki Log</h1>
        <a
          href="https://t.me/One_Piece_Original"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline text-lg"
        >
          Access Hidden Content 🔗
        </a>
      </div>
    </div>
  );
}
