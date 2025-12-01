// Base de Códigos de Erro - RefriPro IA
import { ErrorCode } from './types';

export const ERROR_CODES: ErrorCode[] = [
  // AR-CONDICIONADO - LG
  {
    id: 'lg-ch01',
    code: 'CH01',
    brand: 'LG',
    category: 'ac',
    meaning: 'Erro no sensor de temperatura da serpentina interna',
    probableCauses: [
      'Sensor de temperatura com defeito',
      'Conexão do sensor solta ou oxidada',
      'Placa eletrônica com problema',
    ],
    solution: [
      'Verificar conexão do sensor',
      'Medir resistência do sensor (deve variar com temperatura)',
      'Substituir sensor se necessário',
      'Verificar placa eletrônica',
    ],
    involvedParts: ['Sensor de temperatura', 'Chicote elétrico', 'Placa eletrônica'],
    averageTime: '30-45 minutos',
  },
  {
    id: 'lg-ch02',
    code: 'CH02',
    brand: 'LG',
    category: 'ac',
    meaning: 'Erro no sensor de temperatura ambiente',
    probableCauses: [
      'Sensor ambiente danificado',
      'Fiação rompida',
      'Interferência elétrica',
    ],
    solution: [
      'Testar sensor com multímetro',
      'Verificar continuidade da fiação',
      'Substituir sensor',
    ],
    involvedParts: ['Sensor ambiente', 'Fiação'],
    averageTime: '20-30 minutos',
  },
  {
    id: 'lg-ch05',
    code: 'CH05',
    brand: 'LG',
    category: 'ac',
    meaning: 'Erro de comunicação entre unidades interna e externa',
    probableCauses: [
      'Cabo de comunicação danificado',
      'Conexões soltas',
      'Interferência eletromagnética',
      'Placa eletrônica com defeito',
    ],
    solution: [
      'Verificar cabo de comunicação',
      'Apertar todas as conexões',
      'Testar com cabo novo',
      'Verificar placas eletrônicas',
    ],
    involvedParts: ['Cabo de comunicação', 'Placas eletrônicas'],
    averageTime: '45-60 minutos',
  },

  // AR-CONDICIONADO - SAMSUNG
  {
    id: 'samsung-e101',
    code: 'E101',
    brand: 'Samsung',
    category: 'ac',
    meaning: 'Erro no sensor de temperatura da evaporadora',
    probableCauses: [
      'Sensor com defeito',
      'Conexão solta',
      'Curto-circuito no sensor',
    ],
    solution: [
      'Verificar resistência do sensor',
      'Checar conexões',
      'Substituir sensor',
    ],
    involvedParts: ['Sensor de temperatura'],
    averageTime: '30 minutos',
  },
  {
    id: 'samsung-e121',
    code: 'E121',
    brand: 'Samsung',
    category: 'ac',
    meaning: 'Erro no sensor de temperatura externa',
    probableCauses: [
      'Sensor externo danificado',
      'Exposição a intempéries',
      'Oxidação nos contatos',
    ],
    solution: [
      'Limpar contatos',
      'Testar sensor',
      'Substituir se necessário',
    ],
    involvedParts: ['Sensor externo'],
    averageTime: '25 minutos',
  },

  // AR-CONDICIONADO - MIDEA
  {
    id: 'midea-e1',
    code: 'E1',
    brand: 'Midea',
    category: 'ac',
    meaning: 'Proteção de alta pressão',
    probableCauses: [
      'Condensadora suja',
      'Excesso de gás refrigerante',
      'Ventilador externo não funciona',
      'Ambiente muito quente',
    ],
    solution: [
      'Limpar condensadora',
      'Verificar carga de gás',
      'Testar ventilador externo',
      'Verificar pressostato',
    ],
    involvedParts: ['Condensadora', 'Ventilador', 'Pressostato'],
    averageTime: '60-90 minutos',
  },
  {
    id: 'midea-e2',
    code: 'E2',
    brand: 'Midea',
    category: 'ac',
    meaning: 'Proteção anticongelamento',
    probableCauses: [
      'Filtro de ar sujo',
      'Evaporadora suja',
      'Falta de gás refrigerante',
      'Ventilador interno com problema',
    ],
    solution: [
      'Limpar filtros',
      'Limpar evaporadora',
      'Verificar carga de gás',
      'Testar ventilador interno',
    ],
    involvedParts: ['Filtros', 'Evaporadora', 'Ventilador interno'],
    averageTime: '45-60 minutos',
  },

  // CONTROLADORES - FULL GAUGE
  {
    id: 'fg-p1',
    code: 'P1',
    brand: 'Full Gauge',
    category: 'controller',
    meaning: 'Erro no sensor 1 (NTC)',
    probableCauses: [
      'Sensor desconectado',
      'Sensor em curto',
      'Sensor fora da faixa de leitura',
    ],
    solution: [
      'Verificar conexão do sensor',
      'Medir resistência (10k a 25°C)',
      'Substituir sensor NTC',
    ],
    involvedParts: ['Sensor NTC', 'Cabo do sensor'],
    averageTime: '20 minutos',
  },
  {
    id: 'fg-p2',
    code: 'P2',
    brand: 'Full Gauge',
    category: 'controller',
    meaning: 'Erro no sensor 2 (NTC)',
    probableCauses: [
      'Sensor desconectado',
      'Sensor danificado',
      'Problema na entrada do controlador',
    ],
    solution: [
      'Verificar sensor',
      'Testar entrada do controlador',
      'Substituir sensor',
    ],
    involvedParts: ['Sensor NTC 2'],
    averageTime: '20 minutos',
  },
  {
    id: 'fg-ha',
    code: 'HA',
    brand: 'Full Gauge',
    category: 'controller',
    meaning: 'Alarme de alta temperatura',
    probableCauses: [
      'Temperatura acima do setpoint',
      'Compressor não está ligando',
      'Falta de gás',
      'Porta da câmara aberta',
    ],
    solution: [
      'Verificar temperatura real',
      'Testar compressor',
      'Verificar carga de gás',
      'Verificar vedação da câmara',
    ],
    involvedParts: ['Compressor', 'Sistema de refrigeração'],
    averageTime: '60-120 minutos',
  },

  // CONTROLADORES - DIXELL
  {
    id: 'dixell-p1',
    code: 'P1',
    brand: 'Dixell',
    category: 'controller',
    meaning: 'Erro sonda de temperatura',
    probableCauses: [
      'Sonda desconectada',
      'Sonda em curto-circuito',
      'Cabo rompido',
    ],
    solution: [
      'Verificar conexão',
      'Testar continuidade',
      'Substituir sonda',
    ],
    involvedParts: ['Sonda NTC'],
    averageTime: '15-20 minutos',
  },
  {
    id: 'dixell-ha',
    code: 'HA',
    brand: 'Dixell',
    category: 'controller',
    meaning: 'Alarme de alta temperatura',
    probableCauses: [
      'Temperatura fora do limite',
      'Sistema não está resfriando',
      'Configuração incorreta',
    ],
    solution: [
      'Verificar sistema de refrigeração',
      'Ajustar parâmetros',
      'Verificar compressor',
    ],
    involvedParts: ['Sistema completo'],
    averageTime: '90 minutos',
  },

  // CONTROLADORES - COEL
  {
    id: 'coel-er1',
    code: 'Er1',
    brand: 'Coel',
    category: 'controller',
    meaning: 'Erro sensor ambiente',
    probableCauses: [
      'Sensor desconectado ou danificado',
      'Curto no cabo',
    ],
    solution: [
      'Verificar sensor',
      'Testar resistência',
      'Substituir se necessário',
    ],
    involvedParts: ['Sensor ambiente'],
    averageTime: '20 minutos',
  },

  // GELADEIRAS E FREEZERS
  {
    id: 'consul-f1',
    code: 'F1',
    brand: 'Consul',
    category: 'refrigerator',
    meaning: 'Falha no sensor de degelo',
    probableCauses: [
      'Sensor de degelo com defeito',
      'Fiação danificada',
    ],
    solution: [
      'Testar sensor',
      'Verificar fiação',
      'Substituir sensor',
    ],
    involvedParts: ['Sensor de degelo'],
    averageTime: '40 minutos',
  },
  {
    id: 'electrolux-f1',
    code: 'F1',
    brand: 'Electrolux',
    category: 'refrigerator',
    meaning: 'Erro no sensor de temperatura',
    probableCauses: [
      'Sensor defeituoso',
      'Conexão solta',
    ],
    solution: [
      'Verificar sensor',
      'Testar conexões',
      'Substituir sensor',
    ],
    involvedParts: ['Sensor de temperatura'],
    averageTime: '30 minutos',
  },

  // CÂMARAS FRIGORÍFICAS
  {
    id: 'camera-alta-pressao',
    code: 'ALTA PRESSÃO',
    brand: 'Genérico',
    category: 'cold_room',
    meaning: 'Pressão de condensação muito alta',
    probableCauses: [
      'Condensador sujo',
      'Excesso de gás',
      'Ventilação inadequada',
      'Temperatura ambiente muito alta',
    ],
    solution: [
      'Limpar condensador',
      'Verificar carga de gás',
      'Melhorar ventilação',
      'Verificar pressostato',
    ],
    involvedParts: ['Condensador', 'Pressostato', 'Ventiladores'],
    averageTime: '90-120 minutos',
  },
  {
    id: 'camera-baixa-pressao',
    code: 'BAIXA PRESSÃO',
    brand: 'Genérico',
    category: 'cold_room',
    meaning: 'Pressão de sucção muito baixa',
    probableCauses: [
      'Falta de gás refrigerante',
      'Vazamento no sistema',
      'Filtro secador entupido',
      'Válvula de expansão com problema',
    ],
    solution: [
      'Detectar e reparar vazamentos',
      'Completar carga de gás',
      'Substituir filtro secador',
      'Verificar válvula de expansão',
    ],
    involvedParts: ['Sistema de refrigeração', 'Filtro secador', 'Válvula de expansão'],
    averageTime: '120-180 minutos',
  },
];

export function searchErrorCodes(query: string): ErrorCode[] {
  const lowerQuery = query.toLowerCase();
  return ERROR_CODES.filter(
    (error) =>
      error.code.toLowerCase().includes(lowerQuery) ||
      error.brand.toLowerCase().includes(lowerQuery) ||
      error.meaning.toLowerCase().includes(lowerQuery)
  );
}

export function getErrorCodesByCategory(category: ErrorCode['category']): ErrorCode[] {
  return ERROR_CODES.filter((error) => error.category === category);
}

export function getErrorCodesByBrand(brand: string): ErrorCode[] {
  return ERROR_CODES.filter((error) => error.brand.toLowerCase() === brand.toLowerCase());
}
