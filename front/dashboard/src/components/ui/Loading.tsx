import { Leaf } from 'lucide-react';

interface LoadingProps {
  text?: string;
}

export function Loading({ text = 'Carregando dados...' }: LoadingProps) {
  return (
    <div className="loading-container animate-fade-in">
      <div className="loading-spinner" />
      <p className="loading-text" style={{ color: 'var(--verde-mata)' }}>
        <Leaf size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
        {text}
      </p>
    </div>
  );
}