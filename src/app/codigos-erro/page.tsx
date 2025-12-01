"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, AlertCircle, Clock, Wrench, Package } from 'lucide-react';
import { ERROR_CODES, searchErrorCodes } from '@/lib/refripro/error-codes-data';
import { ErrorCode } from '@/lib/refripro/types';

export default function CodigosErroPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedError, setSelectedError] = useState<ErrorCode | null>(null);

  const filteredErrors = searchQuery
    ? searchErrorCodes(searchQuery)
    : selectedCategory === 'all'
    ? ERROR_CODES
    : ERROR_CODES.filter((e) => e.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'Todos', icon: AlertCircle },
    { value: 'ac', label: 'Ar-Condicionado', icon: AlertCircle },
    { value: 'controller', label: 'Controladores', icon: AlertCircle },
    { value: 'refrigerator', label: 'Geladeiras', icon: AlertCircle },
    { value: 'cold_room', label: 'Câmaras Frias', icon: AlertCircle },
  ];

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
              <h1 className="text-2xl font-bold text-white">Códigos de Erro</h1>
              <p className="text-sm text-slate-300">Base completa de códigos e soluções</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, marca ou descrição..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Error List */}
          <div className="space-y-3">
            {filteredErrors.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600">Nenhum código encontrado</p>
              </div>
            ) : (
              filteredErrors.map((error) => (
                <button
                  key={error.id}
                  onClick={() => setSelectedError(error)}
                  className={`w-full text-left bg-white rounded-xl p-4 transition-all hover:shadow-lg ${
                    selectedError?.id === error.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded font-mono font-bold text-sm">
                          {error.code}
                        </span>
                        <span className="text-xs text-slate-500">{error.brand}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-900">{error.meaning}</p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Error Details */}
          <div className="lg:sticky lg:top-4 h-fit">
            {selectedError ? (
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg font-mono font-bold text-lg">
                      {selectedError.code}
                    </span>
                    <span className="text-sm text-slate-500">{selectedError.brand}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {selectedError.meaning}
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Causas Prováveis */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      Causas Prováveis
                    </h3>
                    <ul className="space-y-2">
                      {selectedError.probableCauses.map((cause, index) => (
                        <li key={index} className="flex gap-2 text-sm text-slate-700">
                          <span className="text-orange-500 font-bold">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solução */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                      <Wrench className="w-4 h-4 text-blue-500" />
                      Como Resolver
                    </h3>
                    <ol className="space-y-2">
                      {selectedError.solution.map((step, index) => (
                        <li key={index} className="flex gap-2 text-sm text-slate-700">
                          <span className="text-blue-500 font-bold">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Peças Envolvidas */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                      <Package className="w-4 h-4 text-purple-500" />
                      Peças Envolvidas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedError.involvedParts.map((part, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm"
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tempo Médio */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-600" />
                      <span className="font-medium text-slate-900">Tempo médio:</span>
                      <span className="text-slate-700">{selectedError.averageTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Selecione um código
                </h3>
                <p className="text-slate-600">
                  Clique em um código para ver detalhes completos
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
