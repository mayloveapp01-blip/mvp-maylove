'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para cadastro após 1 segundo
    const timer = setTimeout(() => {
      router.push('/cadastro');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 shadow-2xl">
          <Heart className="h-12 w-12 text-white" fill="white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Maylove
        </h1>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}
