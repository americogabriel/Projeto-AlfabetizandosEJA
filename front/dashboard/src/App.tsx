import { useState } from 'react';
import { useCsvData } from './hooks/useCsvData';
import { Layout } from './components/layout/Layout';
import { Loading } from './components/ui/Loading';
import { Overview } from './pages/Overview';
import { ByState } from './pages/ByState';
import { Comparison } from './pages/Comparison';

export default function App() {
  const { data2016, data2025, allData, loading, error } = useCsvData();
  const [page, setPage] = useState('overview');

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Loading text="Carregando dados do EJA..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 'var(--spacing-4)',
      }}>
        <h2 style={{ color: 'var(--flor-bromelia)' }}>Erro ao carregar dados</h2>
        <p style={{ color: 'var(--terra-clara)' }}>{error}</p>
        <p style={{ color: 'var(--terra-clara)', fontSize: 'var(--text-sm)' }}>
          Verifique se os arquivos CSV estão em <code>public/data/</code>
        </p>
      </div>
    );
  }

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === 'overview' && (
        <Overview allData={allData} />
      )}
      {page === 'state' && (
        <ByState data2016={data2016} data2025={data2025} allData={allData} />
      )}
      {page === 'comparison' && (
        <Comparison data2016={data2016} data2025={data2025} />
      )}
    </Layout>
  );
}