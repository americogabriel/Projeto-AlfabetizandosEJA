import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import type { Alfabetizando } from '../types';

interface UseCsvDataResult {
  data2025: Alfabetizando[];
  data2016: Alfabetizando[];
  allData: Alfabetizando[];
  loading: boolean;
  error: string | null;
}

interface RawRow {
  ano: number | string;
  uf_entidade: string;
  nome_entidade: string;
  nome: string;
  idade: number | string;
  raca_cor: string;
  zona: string;
  sexo?: string;
  segmento?: string;
}

function normalize(raw: RawRow, index: number): Alfabetizando {
  return {
    id: `${raw.ano}-${index}`,
    ano: Number(raw.ano) as 2016 | 2025,
    uf: (raw.uf_entidade || '').trim(),
    entidade: (raw.nome_entidade || '').trim(),
    nome: (raw.nome || '').trim(),
    idade: Number(raw.idade) || 0,
    racaCor: (raw.raca_cor || '').trim().toUpperCase(),
    zona: (raw.zona || '').trim(),
    sexo: (raw.sexo || '').trim() || undefined,
    segmento: (raw.segmento || '').trim() || undefined,
  };
}

export function useCsvData(): UseCsvDataResult {
  const [allData, setAllData] = useState<Alfabetizando[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await new Promise<Alfabetizando[]>((resolve, reject) => {
          Papa.parse('/data/alfabetizados-unificado.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
              const normalized = results.data.map((row, i) =>
                normalize(row as unknown as RawRow, i)
              );
              resolve(normalized);
            },
            error: (err) => reject(err),
          });
        });

        if (!cancelled) {
          setAllData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const data2025 = useMemo(() => allData.filter((d) => d.ano === 2025), [allData]);
  const data2016 = useMemo(() => allData.filter((d) => d.ano === 2016), [allData]);

  return { data2025, data2016, allData, loading, error };
}