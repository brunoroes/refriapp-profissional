"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, Crown, Users, Zap } from 'lucide-react';

export default function PlanosPage() {
  const router = useRouter();

  const plans = [
    {
      id: 'free',
      name: 'Grátis',
      price: 'R$ 0',
      period: '/mês',
      description: 'Para começar',
      icon: Zap,
      color: 'from-slate-500 to-slate-600',
      features: [
        { text: '2 orçamentos por mês', included: true },
        { text: '2 ordens de serviço por mês', included: true },
        { text: '5 consultas simples na IA', included: true },
        { text: 'Acesso básico aos códigos de erro', included: true },
        { text: 'Histórico limitado', included: true },
        { text: 'Lista de até 10 clientes', included: true },
        { text: 'Anúncios leves', included: true },
        { text: 'PDF com marca d\'água', included: false },
        { text: 'Logo personalizado', included: false },
        { text: 'Assinatura digital', included: false },
      ],
      cta: 'Plano Atual',
      disabled: true,
    },
    {
      id: 'pro',
      name: 'PRO',
      price: 'R$ 24,90',
      period: '/mês',
      yearlyPrice: 'R$ 199/ano',
      description: 'Para profissionais',
      icon: Crown,
      color: 'from-blue-500 to-purple-500',
      popular: true,
      features: [
        { text: 'Orçamentos ilimitados', included: true },
        { text: 'Ordens de serviço ilimitadas', included: true },
        { text: 'IA completa com diagnóstico detalhado', included: true },
        { text: '50 créditos mensais de IA avançada', included: true },
        { text: 'Base completa de códigos de erro', included: true },
        { text: 'PDF profissional sem marca d\'água', included: true },
        { text: 'Adicionar logo da empresa no PDF', included: true },
        { text: 'Assinatura digital do cliente', included: true },
        { text: 'Lista de clientes ilimitada', included: true },
        { text: 'Backup automático em nuvem', included: true },
        { text: 'Tabela de preços personalizada', included: true },
        { text: 'Modo offline', included: true },
        { text: 'Histórico ilimitado', included: true },
        { text: 'Sem anúncios', included: true },
      ],
      cta: 'Assinar PRO',
      disabled: false,
    },
    {
      id: 'empresa',
      name: 'Empresa',
      price: 'R$ 79,90',
      period: '/mês',
      description: 'Para equipes (3 técnicos)',
      extraInfo: '+ R$ 14,90 por técnico extra',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      features: [
        { text: 'Tudo do plano PRO +', included: true },
        { text: 'Painel web administrativo', included: true },
        { text: 'Controle de OS da equipe em tempo real', included: true },
        { text: 'Relatórios mensais e financeiros', included: true },
        { text: 'Controle de estoque', included: true },
        { text: 'Distribuição de tarefas entre técnicos', included: true },
        { text: 'Exportação de relatórios', included: true },
        { text: 'Sincronização entre dispositivos', included: true },
        { text: 'Suporte prioritário', included: true },
      ],
      cta: 'Assinar Empresa',
      disabled: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Planos e Preços</h1>
              <p className="text-sm text-slate-300">Escolha o melhor plano para você</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Ferramentas profissionais para técnicos de refrigeração
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 text-sm font-bold">
                    MAIS POPULAR
                  </div>
                )}

                <div className={`bg-gradient-to-br ${plan.color} p-6 text-white`}>
                  <Icon className="w-10 h-10 mb-3" />
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-90">{plan.period}</span>
                  </div>
                  {plan.yearlyPrice && (
                    <p className="text-sm opacity-90 mt-1">{plan.yearlyPrice}</p>
                  )}
                  {plan.extraInfo && (
                    <p className="text-xs opacity-75 mt-2">{plan.extraInfo}</p>
                  )}
                </div>

                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-slate-700' : 'text-slate-400 line-through'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      if (!plan.disabled) {
                        alert(`Redirecionando para pagamento do plano ${plan.name}...`);
                      }
                    }}
                    disabled={plan.disabled}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      plan.disabled
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : `bg-gradient-to-r ${plan.color} hover:shadow-lg text-white`
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Perguntas Frequentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="text-slate-600 text-sm">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">
                Como funciona o plano Empresa?
              </h4>
              <p className="text-slate-600 text-sm">
                O plano Empresa inclui 3 técnicos. Você pode adicionar mais técnicos por R$ 14,90/mês cada.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">
                Os dados ficam salvos na nuvem?
              </h4>
              <p className="text-slate-600 text-sm">
                Sim, nos planos PRO e Empresa todos os dados são salvos automaticamente na nuvem.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">
                Posso usar offline?
              </h4>
              <p className="text-slate-600 text-sm">
                Sim, o modo offline está disponível nos planos PRO e Empresa.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-12 text-center">
          <p className="text-slate-300 mb-4">
            Ainda tem dúvidas? Entre em contato conosco
          </p>
          <button className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-xl font-medium transition-all">
            Falar com Suporte
          </button>
        </div>
      </main>
    </div>
  );
}
