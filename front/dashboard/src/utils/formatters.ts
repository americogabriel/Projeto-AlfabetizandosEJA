export function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR');
}

export function formatPercent(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;
}

export function formatIdade(idade: number): string {
  return `${idade} anos`;
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '...' : str;
}