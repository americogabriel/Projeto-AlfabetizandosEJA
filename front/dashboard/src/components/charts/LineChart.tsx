import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { ChartDataItem } from '../../types';
import { CHART_COLORS, getCustomTooltipStyle } from '../../utils/chartColors';

interface LineChartProps {
  data: ChartDataItem[];
  title: string;
  height?: number;
  color?: string;
}

export function LineChartComponent({
  data,
  title,
  height = 300,
  color = CHART_COLORS[0],
}: LineChartProps) {
  return (
    <div className="chart-card animate-slide-up">
      <div className="chart-card__header">
        <h3 className="chart-card__title">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <ReLineChart data={data} margin={{ top: 5, right: 20, bottom: 25, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--areia)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: 'var(--terra-clara)' }}
          />
          <YAxis tick={{ fontSize: 12, fill: 'var(--terra-clara)' }} />
          <Tooltip
            contentStyle={getCustomTooltipStyle()}
            formatter={(value) => [Number(value).toLocaleString('pt-BR'), 'Total']}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={{ fill: color, r: 5 }}
            activeDot={{ r: 7, stroke: 'var(--branco)', strokeWidth: 2 }}
            animationDuration={1200}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}