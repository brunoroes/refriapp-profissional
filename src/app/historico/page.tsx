"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, ClipboardList, Trash2, Eye, Calendar } from 'lucide-react';
import { getBudgets, getServiceOrders, deleteBudget, deleteServiceOrder } from '@/lib/refripro/storage';
import { Budget, ServiceOrder } from '@/lib/refripro/types';

export default function HistoricoPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'budgets' | 'orders'>('budgets');
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBudgets(getBudgets().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
    setOrders(getServiceOrders().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const handleDeleteBudget = (id: string) => {
    if (confirm('Deseja realmente excluir este orçamento?')) {
      deleteBudget(id);
      loadData();
    }
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm('Deseja realmente excluir esta ordem de serviço?')) {
      deleteServiceOrder(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Histórico</h1>
              <p className="text-sm text-slate-300">Orçamentos e Ordens de Serviço</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('budgets')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'budgets'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Orçamentos ({budgets.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'orders'
                ? 'bg-white text-cyan-600 shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ClipboardList className="w-5 h-5" />
              <span>Ordens de Serviço ({orders.length})</span>
            </div>
          </button>
        </div>

        {/* Budgets List */}
        {activeTab === 'budgets' && (
          <div className="space-y-4">
            {budgets.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Nenhum orçamento encontrado
                </h3>
                <p className="text-slate-600 mb-6">
                  Crie seu primeiro orçamento para começar
                </p>
                <button
                  onClick={() => router.push('/orcamento')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  Criar Orçamento
                </button>
              </div>
            ) : (
              budgets.map((budget) => (
                <div
                  key={budget.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {budget.clientName}
                        </h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          budget.status === 'approved' ? 'bg-green-100 text-green-700' :
                          budget.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {budget.status === 'approved' ? 'Aprovado' :
                           budget.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-2">{budget.equipmentType}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(budget.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="font-bold text-blue-600">
                          R$ {budget.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Visualização em desenvolvimento')}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Service Orders List */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <ClipboardList className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Nenhuma ordem de serviço encontrada
                </h3>
                <p className="text-slate-600 mb-6">
                  Crie sua primeira OS para começar
                </p>
                <button
                  onClick={() => router.push('/ordem-servico')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  Criar Ordem de Serviço
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {order.clientName}
                        </h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status === 'completed' ? 'Concluída' :
                           order.status === 'in_progress' ? 'Em Andamento' :
                           order.status === 'cancelled' ? 'Cancelada' : 'Aberta'}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-2">
                        {order.equipmentType} - {order.equipmentBrand}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div>Garantia: {order.warranty}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Visualização em desenvolvimento')}
                        className="p-2 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
