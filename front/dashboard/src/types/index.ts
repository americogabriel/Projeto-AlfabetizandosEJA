export interface Alfabetizando {
  id: string;
  ano: 2016 | 2025;
  uf: string;
  entidade: string;
  nome: string;
  idade: number;
  racaCor: string;
  zona: string;
  sexo?: string;
  segmento?: string;
}

export interface Filters {
  ano: 2016 | 2025 | 'todos';
  uf: string;
  zona: string;
  racaCor: string;
  search: string;
}

export interface AggregatedData {
  total: number;
  porEstado: Array<{ name: string; value: number }>;
  porFaixaEtaria: Array<{ name: string; value: number }>;
  porRacaCor: Array<{ name: string; value: number }>;
  porZona: Array<{ name: string; value: number }>;
  porSexo?: Array<{ name: string; value: number }>;
  porSegmento?: Array<{ name: string; value: number }>;
  idadeMedia: number;
  estados: string[];
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface ComparisonStateData {
  uf: string;
  total2016: number;
  total2025: number;
  diferenca: number;
  percentual: number;
}

export type AnoFilter = 2016 | 2025 | 'todos';