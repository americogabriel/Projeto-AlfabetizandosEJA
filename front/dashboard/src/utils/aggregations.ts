import type { Alfabetizando, AggregatedData, Filters } from '../types';

const FAIXAS_ETARIAS = ['15-19', '20-29', '30-39', '40-49', '50-59', '60+'];

export function getFaixaEtaria(idade: number): string {
  if (idade < 20) return '15-19';
  if (idade < 30) return '20-29';
  if (idade < 40) return '30-39';
  if (idade < 50) return '40-49';
  if (idade < 60) return '50-59';
  return '60+';
}

export function groupByKey(
  data: Alfabetizando[],
  key: (item: Alfabetizando) => string,
  sortOrder?: string[]
): Array<{ name: string; value: number }> {
  const map = new Map<string, number>();
  for (const item of data) {
    const k = key(item);
    if (k) {
      map.set(k, (map.get(k) || 0) + 1);
    }
  }

  let entries = Array.from(map.entries()).map(([name, value]) => ({ name, value }));

  if (sortOrder) {
    entries.sort((a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name));
  } else {
    entries.sort((a, b) => b.value - a.value);
  }

  return entries;
}

export function filterData(data: Alfabetizando[], filters: Filters): Alfabetizando[] {
  return data.filter((item) => {
    if (filters.ano !== 'todos' && item.ano !== filters.ano) return false;
    if (filters.uf && item.uf !== filters.uf) return false;
    if (filters.zona && item.zona !== filters.zona) return false;
    if (filters.racaCor && item.racaCor !== filters.racaCor) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (
        !item.nome.toLowerCase().includes(search) &&
        !item.entidade.toLowerCase().includes(search) &&
        !item.uf.toLowerCase().includes(search)
      ) {
        return false;
      }
    }
    return true;
  });
}

export function aggregate(data: Alfabetizando[]): AggregatedData {
  const total = data.length;

  const porEstado = groupByKey(data, (d) => d.uf);
  const porFaixaEtaria = groupByKey(
    data,
    (d) => getFaixaEtaria(d.idade),
    FAIXAS_ETARIAS
  );
  const porRacaCor = groupByKey(data, (d) => d.racaCor);
  const porZona = groupByKey(data, (d) => d.zona);

  const porSexo = data.some((d) => d.sexo)
    ? groupByKey(data, (d) => d.sexo || '')
    : undefined;

  const porSegmento = data.some((d) => d.segmento)
    ? groupByKey(data, (d) => d.segmento || '')
    : undefined;

  const idadeMedia =
    total > 0
      ? Math.round(data.reduce((sum, d) => sum + d.idade, 0) / total)
      : 0;

  const estados = [...new Set(data.map((d) => d.uf))].sort();

  return {
    total,
    porEstado,
    porFaixaEtaria,
    porRacaCor,
    porZona,
    porSexo,
    porSegmento,
    idadeMedia,
    estados,
  };
}

export function compareStates(
  data2016: Alfabetizando[],
  data2025: Alfabetizando[]
) {
  const states2016 = new Map<string, number>();
  const states2025 = new Map<string, number>();

  for (const item of data2016) {
    states2016.set(item.uf, (states2016.get(item.uf) || 0) + 1);
  }
  for (const item of data2025) {
    states2025.set(item.uf, (states2025.get(item.uf) || 0) + 1);
  }

  const commonStates = [...states2016.keys()].filter((s) => states2025.has(s));

  return commonStates
    .map((uf) => {
      const t2016 = states2016.get(uf) || 0;
      const t2025 = states2025.get(uf) || 0;
      const diff = t2025 - t2016;
      const pct = t2016 > 0 ? Math.round((diff / t2016) * 100 * 10) / 10 : 0;
      return { uf, total2016: t2016, total2025: t2025, diferenca: diff, percentual: pct };
    })
    .sort((a, b) => a.uf.localeCompare(b.uf));
}

export function getAvailableYears(data: Alfabetizando[]): number[] {
  return [...new Set(data.map((d) => d.ano))].sort();
}