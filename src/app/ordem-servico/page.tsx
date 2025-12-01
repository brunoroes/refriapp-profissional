"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, FileText, Plus, Trash2 } from 'lucide-react';
import { ServiceOrder } from '@/lib/refripro/types';
import { saveServiceOrder, incrementUsage, canPerformAction, getUser } from '@/lib/refripro/storage';

export default function OrdemServicoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientAddress: '',
    technicianName: '',
    technicianPhone: '',
    equipmentType: '',
    equipmentBrand: '',
    equipmentModel: '',
    reportedDefect: '',
    technicalDiagnosis: '',
    warranty: '90 dias',
  });
  const [replacedParts, setReplacedParts] = useState<string[]>([]);
  const [servicesPerformed, setServicesPerformed] = useState<string[]>([]);
  const [newPart, setNewPart] = useState('');
  const [newService, setNewService] = useState('');

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData(prev => ({
        ...prev,
        technicianName: user.name,
        technicianPhone: user.phone,
      }));
    }
  }, []);

  const addPart = () => {
    if (newPart.trim()) {
      setReplacedParts([...replacedParts, newPart.trim()]);
      setNewPart('');
    }
  };

  const removePart = (index: number) => {
    setReplacedParts(replacedParts.filter((_, i) => i !== index));
  };

  const addService = () => {
    if (newService.trim()) {
      setServicesPerformed([...servicesPerformed, newService.trim()]);
      setNewService('');
    }
  };

  const removeService = (index: number) => {
    setServicesPerformed(servicesPerformed.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const user = getUser();
    if (!user) return;

    if (!canPerformAction('serviceOrder', user.plan)) {
      alert('Você atingiu o limite de ordens de serviço do plano grátis. Faça upgrade para continuar!');
      router.push('/planos');
      return;
    }

    if (!formData.clientName || !formData.equipmentType || !formData.reportedDefect) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    const order: ServiceOrder = {
      id: Date.now().toString(),
      clientId: '',
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientAddress: formData.clientAddress,
      technicianName: formData.technicianName,
      technicianPhone: formData.technicianPhone,
      equipmentType: formData.equipmentType,
      equipmentBrand: formData.equipmentBrand,
      equipmentModel: formData.equipmentModel,
      reportedDefect: formData.reportedDefect,
      technicalDiagnosis: formData.technicalDiagnosis,
      replacedParts,
      servicesPerformed,
      warranty: formData.warranty,
      status: 'completed',
      createdAt: new Date(),
      completedAt: new Date(),
    };

    saveServiceOrder(order);
    incrementUsage('serviceOrders');
    alert('Ordem de Serviço salva com sucesso!');
    router.push('/historico');
  };

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
              <h1 className="text-2xl font-bold text-white">Ordem de Serviço</h1>
              <p className="text-sm text-slate-300">Preencha os dados da OS</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Dados do Cliente */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Dados do Cliente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={formData.clientAddress}
                  onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rua, número, bairro"
                />
              </div>
            </div>
          </div>

          {/* Dados do Técnico */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Dados do Técnico</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome do Técnico
                </label>
                <input
                  type="text"
                  value={formData.technicianName}
                  onChange={(e) => setFormData({ ...formData, technicianName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome do técnico"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Telefone do Técnico
                </label>
                <input
                  type="tel"
                  value={formData.technicianPhone}
                  onChange={(e) => setFormData({ ...formData, technicianPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>

          {/* Dados do Equipamento */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Dados do Equipamento</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Equipamento *
                </label>
                <select
                  value={formData.equipmentType}
                  onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="Ar-condicionado Split">Ar-condicionado Split</option>
                  <option value="Ar-condicionado Janela">Ar-condicionado Janela</option>
                  <option value="Ar-condicionado Cassete">Ar-condicionado Cassete</option>
                  <option value="Geladeira Residencial">Geladeira Residencial</option>
                  <option value="Geladeira Comercial">Geladeira Comercial</option>
                  <option value="Freezer">Freezer</option>
                  <option value="Câmara Fria">Câmara Fria</option>
                  <option value="Balcão Refrigerado">Balcão Refrigerado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.equipmentBrand}
                  onChange={(e) => setFormData({ ...formData, equipmentBrand: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: LG, Samsung, Consul"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.equipmentModel}
                  onChange={(e) => setFormData({ ...formData, equipmentModel: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Modelo do equipamento"
                />
              </div>
            </div>
          </div>

          {/* Defeito e Diagnóstico */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Defeito e Diagnóstico</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Defeito Relatado *
                </label>
                <textarea
                  value={formData.reportedDefect}
                  onChange={(e) => setFormData({ ...formData, reportedDefect: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descreva o problema relatado pelo cliente..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Diagnóstico Técnico
                </label>
                <textarea
                  value={formData.technicalDiagnosis}
                  onChange={(e) => setFormData({ ...formData, technicalDiagnosis: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Diagnóstico técnico detalhado..."
                />
              </div>
            </div>
          </div>

          {/* Peças Trocadas */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Peças Trocadas</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newPart}
                onChange={(e) => setNewPart(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPart()}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome da peça..."
              />
              <button
                onClick={addPart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>
            {replacedParts.length > 0 && (
              <div className="space-y-2">
                {replacedParts.map((part, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-lg"
                  >
                    <span className="text-slate-900">{part}</span>
                    <button
                      onClick={() => removePart(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Serviços Realizados */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Serviços Realizados</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addService()}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descrição do serviço..."
              />
              <button
                onClick={addService}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>
            {servicesPerformed.length > 0 && (
              <div className="space-y-2">
                {servicesPerformed.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-lg"
                  >
                    <span className="text-slate-900">{service}</span>
                    <button
                      onClick={() => removeService(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Garantia */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Garantia do Serviço
            </label>
            <select
              value={formData.warranty}
              onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="30 dias">30 dias</option>
              <option value="60 dias">60 dias</option>
              <option value="90 dias">90 dias</option>
              <option value="6 meses">6 meses</option>
              <option value="1 ano">1 ano</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar Ordem de Serviço
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
