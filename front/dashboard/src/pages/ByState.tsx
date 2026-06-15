import { useState, useMemo } from 'react';
import type { Filters as FiltersType, Alfabetizando } from '../types';
import { filterData, aggregate, groupByKey } from '../utils/aggregations';
import { formatNumber } from '../utils/formatters';
import { RACA_COR_COLORS, ZONA_COLORS } from '../utils/chartColors';
import { Select } from '../components/ui/Select';
import { KpiCard, BarChart, PieChart } from '../components/charts';
import { DataTable } from '../components/ui/DataTable';

const UF_LABELS: Record<string, string> = {
  AL: 'Alagoas',
  BA: 'Bahia',
  CE: 'Ceará',
  MA: 'Maranhão',
  PB: 'Paraíba',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RN: 'Rio Grande do Norte',
  SE: 'Sergipe',
};

interface ByStateProps {
  data2016: Alfabetizando[];
  data2025: Alfabetizando[];
  allData: Alfabetizando[];
}

export function ByState({ allData }: ByStateProps) {
  const [selectedUf, setSelectedUf] = useState('');
  const [filters] = useState<FiltersType>({
    ano: 'todos',
    uf: '',
    zona: '',
    racaCor: '',
    search: '',
  });

  const allUfs = useMemo(
    () => [...new Set(allData.map((d) => d.uf))].sort(),
    [allData]
  );

  const ufOptions = [
    { value: '', label: 'Selecione um estado' },
    ...allUfs.map((uf) => ({
      value: uf,
      label: `${uf} - ${UF_LABELS[uf] || uf}`,
    })),
  ];

  const stateData = useMemo(() => {
    if (!selectedUf) return [];
    return filterData(allData, { ...filters, uf: selectedUf });
  }, [allData, filters, selectedUf]);

  const stateData2025 = useMemo(
    () => stateData.filter((d) => d.ano === 2025),
    [stateData]
  );

  const stateData2016 = useMemo(
    () => stateData.filter((d) => d.ano === 2016),
    [stateData]
  );

  const agg = useMemo(() => aggregate(stateData), [stateData]);

  const porEntidade = useMemo(
    () =>
      groupByKey(stateData, (d) => d.entidade)
        .slice(0, 10),
    [stateData]
  );

  return (
    <div className="page-container">
      <div className="page-header animate-slide-up">
        <h2 className="page-title">Análise por Estado</h2>
        <p className="page-subtitle">
          Detalhamento dos dados de alfabetizandos por estado selecionado
        </p>
      </div>

      <div className="filters-bar">
        <span className="filters-bar__label">Estado</span>
        <Select
          value={selectedUf}
          onChange={setSelectedUf}
          options={ufOptions}
          className="select-wrapper"
        />
      </div>

      {!selectedUf && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-16)' }}>
          <p style={{ color: 'var(--terra-clara)', fontSize: 'var(--text-lg)' }}>
            Selecione um estado para ver a análise detalhada
          </p>
        </div>
      )}

      {selectedUf && (
        <>
          <div className="kpi-grid">
            <KpiCard
              label={`Total - ${UF_LABELS[selectedUf] || selectedUf}`}
              value={agg.total}
              icon="users"
              color="green"
              index={0}
            />
            <KpiCard
              label="Idade Média"
              value={`${agg.idadeMedia} anos`}
              icon="clock"
              color="yellow"
              index={1}
            />
            <KpiCard
              label="Entidades"
              value={porEntidade.length}
              icon="map"
              color="blue"
              index={2}
            />
            <KpiCard
              label="% Urbana"
              value={
                agg.porZona.length > 0
                  ? `${Math.round(
                      ((agg.porZona.find((z) => z.name === 'Urbana')?.value || 0) /
                        agg.total) *
                        100
                    )}%`
                  : '0%'
              }
              icon="pie"
              color="purple"
              index={3}
            />
          </div>

          {stateData2025.length > 0 && stateData2016.length > 0 && (
            <div className="card" style={{
              marginBottom: 'var(--spacing-6)',
              display: 'flex',
              gap: 'var(--spacing-8)',
              justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center' }}>
                <span className="badge badge--blue" style={{ fontSize: 'var(--text-sm)', padding: '6px 16px' }}>
                  2016: {formatNumber(stateData2016.length)}
                </span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span className="badge badge--green" style={{ fontSize: 'var(--text-sm)', padding: '6px 16px' }}>
                  2025: {formatNumber(stateData2025.length)}
                </span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span className={`badge ${stateData2025.length > stateData2016.length ? 'badge--green' : 'badge--red'}`}
                  style={{ fontSize: 'var(--text-sm)', padding: '6px 16px' }}>
                  {stateData2025.length > stateData2016.length ? '↑' : '↓'}{' '}
                  {Math.abs(
                    Math.round(
                      ((stateData2025.length - stateData2016.length) /
                        stateData2016.length) *
                        100
                    )
                  )}%
                </span>
              </div>
            </div>
          )}

          <div className="grid-2" style={{ marginBottom: 'var(--spacing-6)' }}>
            <BarChart
              data={porEntidade}
              title="Top Entidades"
              height={320}
              horizontal
            />
            <PieChart
              data={agg.porFaixaEtaria}
              title="Faixa Etária"
              height={320}
            />
          </div>

          <div className="grid-2" style={{ marginBottom: 'var(--spacing-6)' }}>
            <PieChart
              data={agg.porRacaCor}
              title="Raça/Cor"
              height={300}
              colors={RACA_COR_COLORS}
            />
            <PieChart
              data={agg.porZona}
              title="Zona"
              height={300}
              colors={ZONA_COLORS}
            />
          </div>

          <div className="chart-card" style={{ marginBottom: 'var(--spacing-6)' }}>
            <div className="chart-card__header">
              <h3 className="chart-card__title">Dados Individuais - {UF_LABELS[selectedUf] || selectedUf}</h3>
            </div>
            <DataTable data={stateData} pageSize={15} />
          </div>
        </>
      )}
    </div>
  );
}