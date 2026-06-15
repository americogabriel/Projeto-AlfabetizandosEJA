import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
        <main className="layout__main">
          {children}
        </main>
      </div>
    </div>
  );
}