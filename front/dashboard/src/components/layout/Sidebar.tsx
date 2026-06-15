import { BarChart3, Map, GitCompare, Home } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Visão Geral', icon: Home },
  { id: 'state', label: 'Por Estado', icon: Map },
  { id: 'comparison', label: 'Comparativo', icon: GitCompare },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <nav className="sidebar animate-slide-left">
      <div className="sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {isActive && <BarChart3 size={14} className="sidebar__indicator" />}
            </button>
          );
        })}
      </div>
      <div className="sidebar__footer" />
    </nav>
  );
}