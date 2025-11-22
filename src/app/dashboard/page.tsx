'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/custom/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Baby, Heart, Calendar, BookHeart, Sparkles, Video, AlertCircle } from 'lucide-react';
import { getCurrentUser, getUserProfile } from '@/lib/auth';
import type { User } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          router.push('/cadastro');
          return;
        }

        const { data: profile } = await getUserProfile(authUser.id);
        if (!profile) {
          router.push('/onboarding');
          return;
        }

        setUser(profile);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user) return null;

  const semanaAtual = user.semanas_gestacao || 0;
  const progressoGestacao = (semanaAtual / 40) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Olá, {user.nome}! 💕
          </h1>
          <p className="text-gray-600 text-lg">
            {user.momento === 'gestante' && `Você está na semana ${semanaAtual} da sua gestação`}
            {user.momento === 'bebe' && `Seu bebê tem ${user.idade_bebe_meses} meses`}
            {user.momento === 'tentante' && 'Sua jornada está começando'}
            {user.momento === 'pos_parto' && 'Bem-vinda à maternidade'}
            {user.momento === 'papai' && 'Acompanhando a jornada'}
          </p>
        </div>

        {/* Progresso da Gestação */}
        {user.momento === 'gestante' && (
          <Card className="mb-8 border-0 shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-400 to-rose-400 text-white">
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-6 w-6" />
                Semana {semanaAtual} de 40
              </CardTitle>
              <CardDescription className="text-pink-50">
                Seu bebê está crescendo!
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Progress value={progressoGestacao} className="h-3 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                {Math.round(progressoGestacao)}% da gestação completa
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/timeline">
            <Card className="border-0 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
                  <Baby className="h-7 w-7 text-white" />
                </div>
                <span className="font-medium text-gray-700 text-center">Linha do Tempo</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/diario">
            <Card className="border-0 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <BookHeart className="h-7 w-7 text-white" />
                </div>
                <span className="font-medium text-gray-700 text-center">Diário</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/agenda">
            <Card className="border-0 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <span className="font-medium text-gray-700 text-center">Agenda</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="border-0 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <span className="font-medium text-gray-700 text-center">Chat IA</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card: Marco da Semana */}
          <Card className="border-0 shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Heart className="h-5 w-5 text-pink-500" />
                Marco da Semana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-pink-50 rounded-2xl">
                <h3 className="font-semibold text-gray-800 mb-2">Desenvolvimento</h3>
                <p className="text-sm text-gray-600">
                  {user.momento === 'gestante' && semanaAtual >= 12 && 'Seu bebê já consegue fazer movimentos! Os órgãos principais estão formados.'}
                  {user.momento === 'gestante' && semanaAtual < 12 && 'Fase crucial de formação dos órgãos vitais do bebê.'}
                  {user.momento === 'bebe' && 'Cada dia traz novas descobertas e aprendizados!'}
                </p>
              </div>
              <Button className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>

          {/* Card: Próximas Atividades */}
          <Card className="border-0 shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="h-5 w-5 text-blue-500" />
                Próximas Atividades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-2xl">
                <div className="h-10 w-10 rounded-xl bg-blue-400 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Consulta Pré-natal</p>
                  <p className="text-sm text-gray-600">Próxima semana</p>
                </div>
              </div>
              <Link href="/agenda">
                <Button variant="outline" className="w-full rounded-2xl">
                  Ver Agenda Completa
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card: Vídeos Educativos */}
          <Card className="border-0 shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Video className="h-5 w-5 text-purple-500" />
                Vídeos para Você
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-purple-50 rounded-2xl">
                  <p className="font-medium text-gray-800 mb-1">Nutrição na Gestação</p>
                  <p className="text-sm text-gray-600">5 min</p>
                </div>
                <Link href="/videos">
                  <Button variant="outline" className="w-full rounded-2xl">
                    Ver Todos os Vídeos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Card: Emergência */}
          <Card className="border-0 shadow-lg rounded-3xl border-2 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                Precisa de Ajuda?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Acesso rápido a informações de emergência e quando procurar atendimento.
              </p>
              <Link href="/emergencia">
                <Button className="w-full rounded-2xl bg-red-500 hover:bg-red-600 text-white">
                  Checklist de Emergência
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
