import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { ChartDataItem } from '../../types';
import type { PieLabelRenderProps } from 'recharts';
import { CHART_COLORS, getCustomTooltipStyle } from '../../utils/chartColors';

interface PieChartProps {
  data: ChartDataItem[];
  title: string;
  height?: number;
  colors?: Record<string, string>;
  innerRadius?: number;
}

const RADIAN = Math.PI / 180;

function renderCustomLabel(props: PieLabelRenderProps) {
  const cx = Number(props.cx ?? 0);
  const cy = Number(props.cy ?? 0);
  const midAngle = Number(props.midAngle ?? 0);
  const innerRadius = Number(props.innerRadius ?? 0);
  const outerRadius = Number(props.outerRadius ?? 0);
  const percent = Number(props.percent ?? 0);

  if (!percent || percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--branco)"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function PieChartComponent({
  data,
  title,
  height = 300,
  colors,
  innerRadius = 0,
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-card animate-slide-up">
      <div className="chart-card__header">
        <h3 className="chart-card__title">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={Math.min(height * 0.38, 120)}
            dataKey="value"
            paddingAngle={2}
            animationBegin={0}
            animationDuration={800}
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={
                  colors?.[entry.name] ||
                  CHART_COLORS[index % CHART_COLORS.length]
                }
                stroke="var(--branco-sujo)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={getCustomTooltipStyle()}
            formatter={(value, name) => {
              const num = Number(value);
              const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
              return [`${num.toLocaleString('pt-BR')} (${pct}%)`, String(name)];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'var(--terra-media)' }}
            iconType="circle"
            iconSize={8}
            formatter={(value) => {
              const item = data.find((d) => d.name === value);
              const pct = total > 0 ? ((item?.value || 0) / total * 100).toFixed(1) : '0';
              return `${value} (${pct}%)`;
            }}
          />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}