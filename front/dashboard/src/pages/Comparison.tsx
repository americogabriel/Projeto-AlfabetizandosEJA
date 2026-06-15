import { useMemo } from 'react';
import type { Alfabetizando } from '../types';
import { compareStates, aggregate } from '../utils/aggregations';
import { formatNumber, formatPercent } from '../utils/formatters';
import { ANO_COLORS } from '../utils/chartColors';
import { KpiCard, BarChart, StackedBarChart, PieChart } from '../components/charts';

interface ComparisonProps {
  data2016: Alfabetizando[];
  data2025: Alfabetizando[];
}

export function Comparison({ data2016, data2025 }: ComparisonProps) {
  const comparison = useMemo(
    () => compareStates(data2016, data2025),
    [data2016, data2025]
  );

  const stackedData = useMemo(
    () =>
      comparison.map((c) => ({
        uf: c.uf,
        '2016': c.total2016,
        '2025': c.total2025,
      })),
    [comparison]
  );

  const agg2016 = useMemo(() => aggregate(data2016), [data2016]);
  const agg2025 = useMemo(() => aggregate(data2025), [data2025]);

  const commonStates = useMemo(() => comparison.map((c) => c.uf), [comparison]);

  const agg2025Filtered = useMemo(() => {
    const filtered = data2025.filter((d) => commonStates.includes(d.uf));
    return aggregate(filtered);
  }, [data2025, commonStates]);

  const faixaComparacao = useMemo(() => {
    const faixas = ['15-19', '20-29', '30-39', '40-49', '50-59', '60+'];
    const faixas2016 = new Map(agg2016.porFaixaEtaria.map((f) => [f.name, f.value]));
    const faixas2025 = new Map(agg2025.porFaixaEtaria.map((f) => [f.name, f.value]));

    return faixas.map((f) => ({
      name: f,
      '2016': faixas2016.get(f) || 0,
      '2025': faixas2025.get(f) || 0,
    }));
  }, [agg2016, agg2025]);

  const totalCrescimento = agg2025.total - agg2016.total;
  const pctCrescimento =
    agg2016.total > 0
      ? Math.round((totalCrescimento / agg2016.total) * 100 * 10) / 10
      : 0;

  const totalGrowth = comparison.reduce((sum, c) => sum + c.diferenca, 0);

  return (
    <div className="page-container">
      <div className="page-header animate-slide-up">
        <h2 className="page-title">Comparativo 2016 vs 2025</h2>
        <p className="page-subtitle">
          Análise comparativa entre os anos para os{' '}
          <strong>{comparison.length} estados</strong> presentes em ambas as bases
          (AL, PI, SE)
        </p>
      </div>

      <div className="kpi-grid">
        <KpiCard
          label="Total 2016"
          value={agg2016.total}
          icon="users"
          color="blue"
          detail="3 estados"
          index={0}
        />
        <KpiCard
          label="Total 2025"
          value={agg2025Filtered.total}
          icon="users"
          color="green"
          detail={`${commonStates.length} estados`}
          index={1}
        />
        <KpiCard
          label="Variação Total"
          value={formatPercent(pctCrescimento)}
          icon="pie"
          color={pctCrescimento >= 0 ? 'green' : 'yellow'}
          detail={`${formatNumber(totalGrowth)} registros`}
          index={2}
        />
        <KpiCard
          label="Idade Média"
          value={`${agg2016.idadeMedia} → ${agg2025.idadeMedia}`}
          icon="clock"
          color="purple"
          detail={`${agg2025.idadeMedia - agg2016.idadeMedia > 0 ? '+' : ''}${agg2025.idadeMedia - agg2016.idadeMedia} anos`}
          index={3}
        />
      </div>

      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <StackedBarChart
          data={stackedData}
          title="Comparação por Estado (2016 vs 2025)"
          height={350}
        />
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--spacing-6)' }}>
        {comparison.map((c) => (
          <div key={c.uf} className={`card animate-slide-up stagger-${c.uf === 'AL' ? 1 : c.uf === 'PI' ? 2 : 3}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
              <h4 style={{ color: 'var(--verde-floresta)' }}>{c.uf}</h4>
              <span className={`badge ${c.percentual >= 0 ? 'badge--green' : 'badge--red'}`}>
                {formatPercent(c.percentual)}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--terra-clara)' }}>2016</span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', color: ANO_COLORS['2016'] }}>
                  {formatNumber(c.total2016)}
                </p>
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--terra-clara)' }}>2025</span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', color: ANO_COLORS['2025'] }}>
                  {formatNumber(c.total2025)}
                </p>
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--terra-clara)' }}>Diferença</span>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xl)',
                  color: c.diferenca >= 0 ? 'var(--verde-mata)' : 'var(--flor-bromelia)',
                }}>
                  {c.diferenca >= 0 ? '+' : ''}{formatNumber(c.diferenca)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <StackedBarChart
          data={faixaComparacao}
          title="Faixa Etária: 2016 vs 2025"
          height={350}
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--spacing-6)' }}>
        <BarChart
          data={agg2016.porEstado}
          title="Distribuição por Estado - 2016"
          height={300}
          horizontal
          colors={[ANO_COLORS['2016']]}
        />
        <BarChart
          data={agg2025Filtered.porEstado}
          title="Distribuição por Estado - 2025"
          height={300}
          horizontal
          colors={[ANO_COLORS['2025']]}
        />
      </div>

      <div className="grid-2">
        <PieChart
          data={agg2016.porRacaCor}
          title="Raça/Cor - 2016"
          height={280}
        />
        <PieChart
          data={agg2025Filtered.porRacaCor}
          title="Raça/Cor - 2025"
          height={280}
        />
      </div>
    </div>
  );
}