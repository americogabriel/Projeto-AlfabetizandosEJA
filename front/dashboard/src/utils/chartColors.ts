export const CHART_COLORS = [
  '#00A651',
  '#FFD700',
  '#3498DB',
  '#E74C3C',
  '#8E44AD',
  '#FF6B35',
  '#0077B6',
  '#2ECC71',
  '#FFC107',
  '#7DCEA0',
];

export const ZONA_COLORS: Record<string, string> = {
  Urbana: '#3498DB',
  Rural: '#00A651',
};

export const RACA_COR_COLORS: Record<string, string> = {
  PARDA: '#00A651',
  PRETA: '#2C3E50',
  BRANCA: '#3498DB',
  AMARELA: '#FFD700',
  INDIGENA: '#E74C3C',
  'NÃO INFORMADO': '#BDC3C7',
};

export const SEXO_COLORS: Record<string, string> = {
  Feminino: '#E74C3C',
  Masculino: '#3498DB',
};

export const ANO_COLORS: Record<string, string> = {
  '2016': '#3498DB',
  '2025': '#00A651',
};

export function getColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length];
}

export function getCustomTooltipStyle() {
  return {
    backgroundColor: '#1C2833',
    border: '2px solid #00A651',
    borderRadius: '10px',
    color: '#FFFFFF',
    fontSize: '13px',
    padding: '10px 14px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  };
}