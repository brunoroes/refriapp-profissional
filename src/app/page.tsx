"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  ClipboardList, 
  Bot, 
  History, 
  AlertCircle, 
  User,
  Snowflake,
  ArrowRight
} from 'lucide-react';
import { getUser, saveUser } from '@/lib/refripro/storage';
import { User as UserType } from '@/lib/refripro/types';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    // Inicializar usuário padrão se não existir
    let currentUser = getUser();
    if (!currentUser) {
      currentUser = {
        id: '1',
        name: 'Técnico Demo',
        email: 'demo@refripro.com',
        phone: '(00) 00000-0000',
        plan: 'free',
        credits: 5,
        createdAt: new Date(),
      };
      saveUser(currentUser);
    }
    setUser(currentUser);
  }, []);

  const menuItems = [
    {
      title: 'Criar Orçamento',
      description: 'Gere orçamentos profissionais rapidamente',
      icon: FileText,
      href: '/orcamento',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Ordem de Serviço',
      description: 'Crie OS completas e profissionais',
      icon: ClipboardList,
      href: '/ordem-servico',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Suporte IA Técnico',
      description: 'Diagnósticos e soluções especializadas',
      icon: Bot,
      href: '/suporte-ia',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Histórico',
      description: 'Acesse orçamentos e OS anteriores',
      icon: History,
      href: '/historico',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Códigos de Erro',
      description: 'Base completa de códigos e soluções',
      icon: AlertCircle,
      href: '/codigos-erro',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Perfil e Plano',
      description: 'Gerencie sua conta e assinatura',
      icon: User,
      href: '/perfil',
      color: 'from-slate-500 to-slate-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
                <Snowflake className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">RefriPro IA</h1>
                <p className="text-sm text-slate-300">Gestão Profissional</p>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">
                    Plano {user.plan === 'free' ? 'Grátis' : user.plan === 'pro' ? 'PRO' : 'Empresa'}
                  </p>
                </div>
                <button
                  onClick={() => router.push('/perfil')}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Bem-vindo ao RefriPro IA
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Sua ferramenta completa para gestão profissional de serviços de refrigeração
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                    Acessar
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        {user && user.plan === 'free' && (
          <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Plano Grátis Ativo
                </h3>
                <p className="text-slate-300">
                  Faça upgrade para desbloquear recursos ilimitados
                </p>
              </div>
              <button
                onClick={() => router.push('/planos')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
              >
                Ver Planos
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-400 text-sm">
            RefriPro IA © 2024 - Gestão Profissional para Refrigeristas
          </p>
        </div>
      </footer>
    </div>
  );
}
