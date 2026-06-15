import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ANO_COLORS, getCustomTooltipStyle } from '../../utils/chartColors';

interface ComparisonData {
  uf?: string;
  name?: string;
  '2016': number;
  '2025': number;
}

interface StackedBarChartProps {
  data: ComparisonData[];
  title: string;
  height?: number;
}

export function StackedBarChart({
  data,
  title,
  height = 350,
}: StackedBarChartProps) {
  return (
    <div className="chart-card animate-slide-up">
      <div className="chart-card__header">
        <h3 className="chart-card__title">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 25, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--areia)" />
          <XAxis
            dataKey={data[0]?.uf ? 'uf' : 'name'}
            tick={{ fontSize: 13, fill: 'var(--terra-clara)', fontWeight: 600 }}
          />
          <YAxis tick={{ fontSize: 12, fill: 'var(--terra-clara)' }} />
          <Tooltip
            contentStyle={getCustomTooltipStyle()}
            formatter={(value, name) => [
              Number(value).toLocaleString('pt-BR'),
              String(name),
            ]}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          <Bar dataKey="2016" fill={ANO_COLORS['2016']} radius={[4, 4, 0, 0]} maxBarSize={50} />
          <Bar dataKey="2025" fill={ANO_COLORS['2025']} radius={[4, 4, 0, 0]} maxBarSize={50} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}