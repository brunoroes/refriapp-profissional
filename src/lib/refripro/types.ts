// Tipos do RefriPro IA

export type PlanType = 'free' | 'pro' | 'empresa';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  logo?: string;
  plan: PlanType;
  credits: number;
  createdAt: Date;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  cpfCnpj?: string;
  notes?: string;
  createdAt: Date;
}

export interface Material {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Budget {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientAddress?: string;
  equipmentType: string;
  serviceDescription: string;
  materials: Material[];
  laborCost: number;
  observations?: string;
  total: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceOrder {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientAddress?: string;
  technicianName: string;
  technicianPhone: string;
  equipmentType: string;
  equipmentBrand: string;
  equipmentModel?: string;
  reportedDefect: string;
  technicalDiagnosis: string;
  replacedParts: string[];
  servicesPerformed: string[];
  warranty: string;
  signature?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
}

export interface ErrorCode {
  id: string;
  code: string;
  brand: string;
  category: 'ac' | 'controller' | 'refrigerator' | 'freezer' | 'cold_room';
  meaning: string;
  probableCauses: string[];
  solution: string[];
  involvedParts: string[];
  averageTime: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AISession {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanLimits {
  budgets: number | 'unlimited';
  serviceOrders: number | 'unlimited';
  aiCredits: number | 'unlimited';
  clients: number | 'unlimited';
  errorCodes: 'basic' | 'full';
  features: {
    pdfWatermark: boolean;
    customLogo: boolean;
    digitalSignature: boolean;
    cloudBackup: boolean;
    customPricing: boolean;
    offlineMode: boolean;
    unlimitedHistory: boolean;
    noAds: boolean;
    webPanel?: boolean;
    teamControl?: boolean;
    reports?: boolean;
    stockControl?: boolean;
  };
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    budgets: 2,
    serviceOrders: 2,
    aiCredits: 5,
    clients: 10,
    errorCodes: 'basic',
    features: {
      pdfWatermark: true,
      customLogo: false,
      digitalSignature: false,
      cloudBackup: false,
      customPricing: false,
      offlineMode: false,
      unlimitedHistory: false,
      noAds: false,
    },
  },
  pro: {
    budgets: 'unlimited',
    serviceOrders: 'unlimited',
    aiCredits: 50,
    clients: 'unlimited',
    errorCodes: 'full',
    features: {
      pdfWatermark: false,
      customLogo: true,
      digitalSignature: true,
      cloudBackup: true,
      customPricing: true,
      offlineMode: true,
      unlimitedHistory: true,
      noAds: true,
    },
  },
  empresa: {
    budgets: 'unlimited',
    serviceOrders: 'unlimited',
    aiCredits: 'unlimited',
    clients: 'unlimited',
    errorCodes: 'full',
    features: {
      pdfWatermark: false,
      customLogo: true,
      digitalSignature: true,
      cloudBackup: true,
      customPricing: true,
      offlineMode: true,
      unlimitedHistory: true,
      noAds: true,
      webPanel: true,
      teamControl: true,
      reports: true,
      stockControl: true,
    },
  },
};
