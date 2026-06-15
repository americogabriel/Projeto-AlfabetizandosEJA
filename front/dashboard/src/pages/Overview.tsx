import { useMemo } from 'react';
import type { Alfabetizando } from '../types';
import { aggregate } from '../utils/aggregations';
import { formatNumber } from '../utils/formatters';
import { ZONA_COLORS, RACA_COR_COLORS } from '../utils/chartColors';
import { KpiCard, BarChart, PieChart } from '../components/charts';
import { DataTable } from '../components/ui/DataTable';

interface OverviewProps {
  allData: Alfabetizando[];
}

export function Overview({ allData }: OverviewProps) {
  const agg = useMemo(() => aggregate(allData), [allData]);

  return (
    <div className="page-container">
      <div className="page-header animate-slide-up">
        <h2 className="page-title">Visão Geral</h2>
        <p className="page-subtitle">
          Dados agregados de alfabetizandos do programa EJA
        </p>
      </div>

      <div className="kpi-grid">
        <KpiCard
          label="Total Alfabetizandos"
          value={agg.total}
          icon="users"
          color="green"
          detail={`${agg.estados.length} estados`}
          index={0}
        />
        <KpiCard
          label="Estados"
          value={agg.estados.length}
          icon="map"
          color="blue"
          detail={agg.estados.join(', ')}
          index={1}
        />
        <KpiCard
          label="Idade Média"
          value={`${agg.idadeMedia} anos`}
          icon="clock"
          color="yellow"
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
          detail={`${formatNumber(
            agg.porZona.find((z) => z.name === 'Urbana')?.value || 0
          )} urbanos`}
          index={3}
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--spacing-6)' }}>
        <BarChart
          data={agg.porEstado}
          title="Alfabetizandos por Estado"
          height={320}
          horizontal
          maxItems={12}
        />
        <PieChart
          data={agg.porFaixaEtaria}
          title="Distribuição por Faixa Etária"
          height={320}
        />
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--spacing-6)' }}>
        <PieChart
          data={agg.porRacaCor}
          title="Distribuição por Raça/Cor"
          height={320}
          colors={RACA_COR_COLORS}
        />
        <PieChart
          data={agg.porZona}
          title="Distribuição por Zona (Urbana/Rural)"
          height={320}
          colors={ZONA_COLORS}
        />
        {agg.porSexo && agg.porSexo.length > 0 && (
          <PieChart
            data={agg.porSexo}
            title="Distribuição por Sexo"
            height={320}
          />
        )}
      </div>

      <div className="chart-card" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="chart-card__header">
          <h3 className="chart-card__title">Dados Individuais</h3>
        </div>
        <DataTable data={allData} pageSize={15} />
      </div>
    </div>
  );
}