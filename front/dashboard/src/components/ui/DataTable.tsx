import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import type { Alfabetizando } from '../../types';
import { truncate } from '../../utils/formatters';

interface DataTableProps {
  data: Alfabetizando[];
  pageSize?: number;
}

export function DataTable({ data, pageSize = 20 }: DataTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const startIdx = (page - 1) * pageSize;
  const pageData = data.slice(startIdx, startIdx + pageSize);

  return (
    <div className="animate-slide-up">
      <div className="table-container" style={{ maxHeight: 500, overflowY: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>UF</th>
              <th>Entidade</th>
              <th>Idade</th>
              <th>Raça/Cor</th>
              <th>Zona</th>
              <th>Ano</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item) => (
              <tr key={item.id}>
                <td>{truncate(item.nome, 35)}</td>
                <td><strong>{item.uf}</strong></td>
                <td>{truncate(item.entidade, 30)}</td>
                <td>{item.idade}</td>
                <td>{item.racaCor}</td>
                <td>{item.zona}</td>
                <td>{item.ano}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="pagination__info">
            Página {page} de {totalPages} ({data.length.toLocaleString('pt-BR')} registros)
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}