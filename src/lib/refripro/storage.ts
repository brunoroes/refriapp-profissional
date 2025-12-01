// Sistema de armazenamento local - RefriPro IA
import { Budget, ServiceOrder, Client, User, AISession } from './types';

const STORAGE_KEYS = {
  USER: 'refripro_user',
  BUDGETS: 'refripro_budgets',
  SERVICE_ORDERS: 'refripro_service_orders',
  CLIENTS: 'refripro_clients',
  AI_SESSIONS: 'refripro_ai_sessions',
  USAGE: 'refripro_usage',
};

// User
export function saveUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function getUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export function updateUserCredits(credits: number): void {
  const user = getUser();
  if (user) {
    user.credits = credits;
    saveUser(user);
  }
}

// Budgets
export function saveBudget(budget: Budget): void {
  const budgets = getBudgets();
  const index = budgets.findIndex((b) => b.id === budget.id);
  if (index >= 0) {
    budgets[index] = budget;
  } else {
    budgets.push(budget);
  }
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
}

export function getBudgets(): Budget[] {
  const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
  return data ? JSON.parse(data) : [];
}

export function getBudgetById(id: string): Budget | null {
  const budgets = getBudgets();
  return budgets.find((b) => b.id === id) || null;
}

export function deleteBudget(id: string): void {
  const budgets = getBudgets().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
}

// Service Orders
export function saveServiceOrder(order: ServiceOrder): void {
  const orders = getServiceOrders();
  const index = orders.findIndex((o) => o.id === order.id);
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.push(order);
  }
  localStorage.setItem(STORAGE_KEYS.SERVICE_ORDERS, JSON.stringify(orders));
}

export function getServiceOrders(): ServiceOrder[] {
  const data = localStorage.getItem(STORAGE_KEYS.SERVICE_ORDERS);
  return data ? JSON.parse(data) : [];
}

export function getServiceOrderById(id: string): ServiceOrder | null {
  const orders = getServiceOrders();
  return orders.find((o) => o.id === id) || null;
}

export function deleteServiceOrder(id: string): void {
  const orders = getServiceOrders().filter((o) => o.id !== id);
  localStorage.setItem(STORAGE_KEYS.SERVICE_ORDERS, JSON.stringify(orders));
}

// Clients
export function saveClient(client: Client): void {
  const clients = getClients();
  const index = clients.findIndex((c) => c.id === client.id);
  if (index >= 0) {
    clients[index] = client;
  } else {
    clients.push(client);
  }
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
}

export function getClients(): Client[] {
  const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
  return data ? JSON.parse(data) : [];
}

export function getClientById(id: string): Client | null {
  const clients = getClients();
  return clients.find((c) => c.id === id) || null;
}

export function deleteClient(id: string): void {
  const clients = getClients().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
}

// AI Sessions
export function saveAISession(session: AISession): void {
  const sessions = getAISessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  localStorage.setItem(STORAGE_KEYS.AI_SESSIONS, JSON.stringify(sessions));
}

export function getAISessions(): AISession[] {
  const data = localStorage.getItem(STORAGE_KEYS.AI_SESSIONS);
  return data ? JSON.parse(data) : [];
}

export function getAISessionById(id: string): AISession | null {
  const sessions = getAISessions();
  return sessions.find((s) => s.id === id) || null;
}

export function deleteAISession(id: string): void {
  const sessions = getAISessions().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.AI_SESSIONS, JSON.stringify(sessions));
}

// Usage tracking
interface Usage {
  month: string;
  budgets: number;
  serviceOrders: number;
  aiQueries: number;
}

export function getCurrentUsage(): Usage {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const data = localStorage.getItem(STORAGE_KEYS.USAGE);
  const allUsage: Usage[] = data ? JSON.parse(data) : [];
  
  let usage = allUsage.find((u) => u.month === currentMonth);
  if (!usage) {
    usage = { month: currentMonth, budgets: 0, serviceOrders: 0, aiQueries: 0 };
    allUsage.push(usage);
    localStorage.setItem(STORAGE_KEYS.USAGE, JSON.stringify(allUsage));
  }
  
  return usage;
}

export function incrementUsage(type: 'budgets' | 'serviceOrders' | 'aiQueries'): void {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const data = localStorage.getItem(STORAGE_KEYS.USAGE);
  const allUsage: Usage[] = data ? JSON.parse(data) : [];
  
  let usage = allUsage.find((u) => u.month === currentMonth);
  if (!usage) {
    usage = { month: currentMonth, budgets: 0, serviceOrders: 0, aiQueries: 0 };
    allUsage.push(usage);
  }
  
  usage[type]++;
  localStorage.setItem(STORAGE_KEYS.USAGE, JSON.stringify(allUsage));
}

export function canPerformAction(
  action: 'budget' | 'serviceOrder' | 'aiQuery',
  userPlan: 'free' | 'pro' | 'empresa'
): boolean {
  if (userPlan !== 'free') return true;
  
  const usage = getCurrentUsage();
  
  switch (action) {
    case 'budget':
      return usage.budgets < 2;
    case 'serviceOrder':
      return usage.serviceOrders < 2;
    case 'aiQuery':
      return usage.aiQueries < 5;
    default:
      return false;
  }
}
