import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { ChartDataItem } from '../../types';
import { CHART_COLORS, getCustomTooltipStyle } from '../../utils/chartColors';

interface BarChartProps {
  data: ChartDataItem[];
  title: string;
  height?: number;
  maxItems?: number;
  horizontal?: boolean;
  colors?: string[];
}

export function BarChartComponent({
  data,
  title,
  height = 300,
  maxItems = 10,
  horizontal = false,
  colors = CHART_COLORS,
}: BarChartProps) {
  const chartData = data.slice(0, maxItems);

  const formatTick = (value: string) => {
    if (!value) return '';
    return value.length > 28 ? value.slice(0, 26) + '...' : value;
  };

  return (
    <div className="chart-card animate-slide-up">
      <div className="chart-card__header">
        <h3 className="chart-card__title">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={Math.max(height, chartData.length * 40 + 60)}>
        <ReBarChart
          data={chartData}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 5, right: 20, bottom: 25, left: horizontal ? 20 : 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--areia)" />
          {horizontal ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--terra-clara)' }} />
              <YAxis
                type="category"
                dataKey="name"
                tickFormatter={formatTick}
                tick={{ fontSize: 12, fill: 'var(--terra-clara)' }}
                width={200}
                interval={0}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="name"
                tickFormatter={formatTick}
                tick={{ fontSize: 11, fill: 'var(--terra-clara)' }}
                angle={-35}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis tick={{ fontSize: 12, fill: 'var(--terra-clara)' }} />
            </>
          )}
          <Tooltip
            contentStyle={getCustomTooltipStyle()}
            cursor={{ fill: 'rgba(116, 198, 157, 0.1)' }}
            formatter={(value) => [Number(value).toLocaleString('pt-BR'), 'Total']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={50}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}