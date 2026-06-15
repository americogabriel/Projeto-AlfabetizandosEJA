import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="header animate-slide-down">
      <div className="header__brand">
        <div className="header__logo" style={{ background: 'none' }}>
          <img src="/brasil.svg" alt="Brasil" style={{ width: 36, height: 25, borderRadius: 3 }} />
        </div>
        <div>
          <h1 className="header__title">EJA Dashboard</h1>
          <p className="header__subtitle">Análise Alfabetizandos 2016 vs 2025</p>
        </div>
      </div>
      <div className="header__badge">
        <Leaf size={14} />
        <span>Dados públicos - Programa EJA</span>
      </div>
    </header>
  );
}