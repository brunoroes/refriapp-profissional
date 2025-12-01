"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User as UserIcon, Phone, Mail, Building, Save, Crown } from 'lucide-react';
import { getUser, saveUser } from '@/lib/refripro/storage';
import { User } from '@/lib/refripro/types';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        company: currentUser.company || '',
      });
    }
  }, []);

  const handleSave = () => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
    };

    saveUser(updatedUser);
    setUser(updatedUser);
    alert('Perfil atualizado com sucesso!');
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'Grátis';
      case 'pro':
        return 'PRO';
      case 'empresa':
        return 'Empresa';
      default:
        return plan;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'from-slate-500 to-slate-600';
      case 'pro':
        return 'from-blue-500 to-purple-500';
      case 'empresa':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Perfil e Plano</h1>
              <p className="text-sm text-slate-300">Gerencie sua conta</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className={`bg-gradient-to-br ${getPlanColor(user.plan)} p-4 rounded-xl mb-4`}>
                <Crown className="w-8 h-8 text-white mb-2" />
                <h3 className="text-xl font-bold text-white">Plano {getPlanName(user.plan)}</h3>
              </div>

              {user.plan === 'free' && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Orçamentos</span>
                    <span className="font-medium text-slate-900">2/mês</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Ordens de Serviço</span>
                    <span className="font-medium text-slate-900">2/mês</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Créditos IA</span>
                    <span className="font-medium text-slate-900">{user.credits}/5</span>
                  </div>
                </div>
              )}

              {user.plan === 'pro' && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Orçamentos</span>
                    <span className="font-medium text-green-600">Ilimitado</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Ordens de Serviço</span>
                    <span className="font-medium text-green-600">Ilimitado</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Créditos IA</span>
                    <span className="font-medium text-slate-900">50/mês</span>
                  </div>
                </div>
              )}

              {user.plan === 'empresa' && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tudo</span>
                    <span className="font-medium text-green-600">Ilimitado</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Painel Web</span>
                    <span className="font-medium text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Equipe</span>
                    <span className="font-medium text-green-600">✓</span>
                  </div>
                </div>
              )}

              {user.plan === 'free' && (
                <button
                  onClick={() => router.push('/planos')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all"
                >
                  Fazer Upgrade
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Dados do Perfil</h2>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <UserIcon className="w-4 h-4" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <Mail className="w-4 h-4" />
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <Building className="w-4 h-4" />
                    Empresa (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome da empresa"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
