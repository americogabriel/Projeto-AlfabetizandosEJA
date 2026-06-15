import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  flat?: boolean;
}

export function Card({ children, className = '', flat = false }: CardProps) {
  return (
    <div className={`card ${flat ? 'card--flat' : ''} ${className}`}>
      {children}
    </div>
  );
}