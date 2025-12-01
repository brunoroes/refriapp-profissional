"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Save, FileText, Send } from 'lucide-react';
import { Budget, Material, Client } from '@/lib/refripro/types';
import { saveBudget, getClients, incrementUsage, canPerformAction, getUser } from '@/lib/refripro/storage';

export default function OrcamentoPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientAddress: '',
    equipmentType: '',
    serviceDescription: '',
    laborCost: 0,
    observations: '',
  });
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0,
  });

  useEffect(() => {
    setClients(getClients());
  }, []);

  const addMaterial = () => {
    if (!newMaterial.description || newMaterial.unitPrice <= 0) return;

    const material: Material = {
      id: Date.now().toString(),
      description: newMaterial.description,
      quantity: newMaterial.quantity,
      unitPrice: newMaterial.unitPrice,
      total: newMaterial.quantity * newMaterial.unitPrice,
    };

    setMaterials([...materials, material]);
    setNewMaterial({ description: '', quantity: 1, unitPrice: 0 });
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const calculateTotal = () => {
    const materialsTotal = materials.reduce((sum, m) => sum + m.total, 0);
    return materialsTotal + formData.laborCost;
  };

  const handleSave = () => {
    const user = getUser();
    if (!user) return;

    if (!canPerformAction('budget', user.plan)) {
      alert('Você atingiu o limite de orçamentos do plano grátis. Faça upgrade para continuar!');
      router.push('/planos');
      return;
    }

    if (!formData.clientName || !formData.equipmentType) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    const budget: Budget = {
      id: Date.now().toString(),
      clientId: '',
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientAddress: formData.clientAddress,
      equipmentType: formData.equipmentType,
      serviceDescription: formData.serviceDescription,
      materials,
      laborCost: formData.laborCost,
      observations: formData.observations,
      total: calculateTotal(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveBudget(budget);
    incrementUsage('budgets');
    alert('Orçamento salvo com sucesso!');
    router.push('/historico');
  };

  const handleWhatsApp = () => {
    const total = calculateTotal();
    const message = `*ORÇAMENTO - RefriPro IA*\n\n` +
      `*Cliente:* ${formData.clientName}\n` +
      `*Telefone:* ${formData.clientPhone}\n` +
      `*Endereço:* ${formData.clientAddress}\n\n` +
      `*Equipamento:* ${formData.equipmentType}\n` +
      `*Serviço:* ${formData.serviceDescription}\n\n` +
      `*MATERIAIS:*\n` +
      materials.map(m => `• ${m.description} - ${m.quantity}x R$ ${m.unitPrice.toFixed(2)} = R$ ${m.total.toFixed(2)}`).join('\n') +
      `\n\n*Mão de Obra:* R$ ${formData.laborCost.toFixed(2)}\n` +
      `*TOTAL:* R$ ${total.toFixed(2)}\n\n` +
      `${formData.observations ? `*Observações:* ${formData.observations}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
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
              <h1 className="text-2xl font-bold text-white">Criar Orçamento</h1>
              <p className="text-sm text-slate-300">Preencha os dados do orçamento</p>
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

          {/* Dados do Serviço */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Dados do Serviço</h2>
            <div className="grid grid-cols-1 gap-4">
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
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Descrição do Serviço
                </label>
                <textarea
                  value={formData.serviceDescription}
                  onChange={(e) => setFormData({ ...formData, serviceDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descreva o serviço a ser realizado..."
                />
              </div>
            </div>
          </div>

          {/* Materiais */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Materiais</h2>
            
            {/* Add Material Form */}
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="Descrição do material"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="number"
                    value={newMaterial.quantity}
                    onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="Qtd"
                    min="1"
                  />
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="number"
                    value={newMaterial.unitPrice}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="Preço unit."
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    onClick={addMaterial}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Adicionar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Materials List */}
            {materials.length > 0 && (
              <div className="space-y-2">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{material.description}</p>
                      <p className="text-sm text-slate-600">
                        {material.quantity}x R$ {material.unitPrice.toFixed(2)} = R$ {material.total.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeMaterial(material.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mão de Obra e Total */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Valores</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mão de Obra (R$)
                </label>
                <input
                  type="number"
                  value={formData.laborCost}
                  onChange={(e) => setFormData({ ...formData, laborCost: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">TOTAL</span>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Informações adicionais..."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar Orçamento
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
