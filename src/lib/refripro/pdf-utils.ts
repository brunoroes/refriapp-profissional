// Utilitários para geração de PDF - RefriPro IA

import { Budget, ServiceOrder } from './types';

export function generateBudgetText(budget: Budget): string {
  const text = `
═══════════════════════════════════════
           ORÇAMENTO - RefriPro IA
═══════════════════════════════════════

DADOS DO CLIENTE
Nome: ${budget.clientName}
Telefone: ${budget.clientPhone}
Endereço: ${budget.clientAddress || 'Não informado'}

EQUIPAMENTO
Tipo: ${budget.equipmentType}

DESCRIÇÃO DO SERVIÇO
${budget.serviceDescription || 'Não informado'}

───────────────────────────────────────
MATERIAIS
───────────────────────────────────────
${budget.materials.map(m => 
  `${m.description}\n  ${m.quantity}x R$ ${m.unitPrice.toFixed(2)} = R$ ${m.total.toFixed(2)}`
).join('\n\n')}

───────────────────────────────────────
MÃO DE OBRA: R$ ${budget.laborCost.toFixed(2)}
───────────────────────────────────────

TOTAL: R$ ${budget.total.toFixed(2)}

${budget.observations ? `\nOBSERVAÇÕES:\n${budget.observations}` : ''}

───────────────────────────────────────
Data: ${new Date(budget.createdAt).toLocaleDateString('pt-BR')}
RefriPro IA - Gestão Profissional
═══════════════════════════════════════
  `.trim();

  return text;
}

export function generateServiceOrderText(order: ServiceOrder): string {
  const text = `
═══════════════════════════════════════
      ORDEM DE SERVIÇO - RefriPro IA
═══════════════════════════════════════

OS Nº: ${order.id}
Data: ${new Date(order.createdAt).toLocaleDateString('pt-BR')}

DADOS DO CLIENTE
Nome: ${order.clientName}
Telefone: ${order.clientPhone}
Endereço: ${order.clientAddress || 'Não informado'}

DADOS DO TÉCNICO
Nome: ${order.technicianName}
Telefone: ${order.technicianPhone}

EQUIPAMENTO
Tipo: ${order.equipmentType}
Marca: ${order.equipmentBrand}
Modelo: ${order.equipmentModel || 'Não informado'}

───────────────────────────────────────
DEFEITO RELATADO
───────────────────────────────────────
${order.reportedDefect}

───────────────────────────────────────
DIAGNÓSTICO TÉCNICO
───────────────────────────────────────
${order.technicalDiagnosis || 'Não informado'}

───────────────────────────────────────
PEÇAS TROCADAS
───────────────────────────────────────
${order.replacedParts.length > 0 
  ? order.replacedParts.map((p, i) => `${i + 1}. ${p}`).join('\n')
  : 'Nenhuma peça trocada'}

───────────────────────────────────────
SERVIÇOS REALIZADOS
───────────────────────────────────────
${order.servicesPerformed.length > 0
  ? order.servicesPerformed.map((s, i) => `${i + 1}. ${s}`).join('\n')
  : 'Nenhum serviço registrado'}

───────────────────────────────────────
GARANTIA: ${order.warranty}
───────────────────────────────────────

${order.completedAt ? `Concluído em: ${new Date(order.completedAt).toLocaleDateString('pt-BR')}` : ''}

RefriPro IA - Gestão Profissional
═══════════════════════════════════════
  `.trim();

  return text;
}

export function downloadAsText(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function shareViaWhatsApp(content: string) {
  const encodedContent = encodeURIComponent(content);
  window.open(`https://wa.me/?text=${encodedContent}`, '_blank');
}
