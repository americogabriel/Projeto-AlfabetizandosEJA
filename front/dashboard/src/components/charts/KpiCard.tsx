import { Users, MapPin, Clock, PieChart } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface KpiCardProps {
  label: string;
  value: number | string;
  icon: 'users' | 'map' | 'clock' | 'pie';
  color: 'green' | 'blue' | 'yellow' | 'purple';
  detail?: string;
  index?: number;
}

const ICONS = {
  users: Users,
  map: MapPin,
  clock: Clock,
  pie: PieChart,
};

export function KpiCard({ label, value, icon, color, detail, index = 0 }: KpiCardProps) {
  const Icon = ICONS[icon];
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <div className={`kpi-card animate-slide-up stagger-${index + 1}`}>
      <div className={`kpi-card__icon kpi-card__icon--${color}`}>
        <Icon size={24} />
      </div>
      <span className="kpi-card__label">{label}</span>
      <span className="kpi-card__value">{formattedValue}</span>
      {detail && <span className="kpi-card__detail">{detail}</span>}
    </div>
  );
}