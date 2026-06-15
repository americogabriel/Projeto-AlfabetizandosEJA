# Projeto Alfabetizandos EJA

## Descrição

Dashboard interativo para análise de dados do programa de Educação de Jovens e Adultos (EJA), comparando indicadores entre 2016 e 2025.

## Estrutura do Projeto

```
Projeto-AlfabetizandosEJA/
├── README.md                  # Este arquivo
├── LICENSE                    # Licença
├── guia.txt                   # Guia de apresentação (5-7 min)
│
├── dados/                     # Dados e scripts de processamento
│   ├── originais/             # CSVs brutos do governo
│   │   ├── Alfabetizados_2016.csv
│   │   └── Alfabetizandos_2025.csv
│   ├── AlfabetizadosUnificados_Dashboard.csv  # CSV enriquecido (usado pelo dashboard)
│   └── gerar_unificado_dashboard.py           # Script Python para gerar CSV unificado
│
└── dashboard/                 # Frontend React + TypeScript
    ├── public/data/           # CSV copiado para consumo pelo browser
    ├── src/
    │   ├── components/        # Componentes reutilizáveis
    │   │   ├── charts/        # Gráficos (Bar, Pie, Line, KpiCard, StackedBar)
    │   │   ├── layout/        # Header, Sidebar, Layout
    │   │   └── ui/            # Card, Button, Select, Badge, Loading, DataTable
    │   ├── hooks/             # useCsvData (carrega CSV via PapaParse)
    │   ├── pages/             # Páginas (Overview, ByState, Comparison)
    │   ├── styles/            # CSS (variables, global, components, animations, layout)
    │   ├── types/             # Interfaces TypeScript
    │   └── utils/             # Agregações, formatação, cores dos gráficos
    ├── package.json
    └── vite.config.ts
```

## Tecnologias

- **Frontend:** React 19 + TypeScript + Vite
- **Gráficos:** Recharts
- **CSV Parser:** PapaParse
- **Ícones:** Lucide React
- **Estilo:** CSS puro com paleta Brasil (verde, amarelo, azul)
- **Backend:** Nenhum (zero backend, CSVs carregados no browser)

## Como Rodar

```bash
cd dashboard
npm install      # primeira vez
npm run dev      # http://localhost:5173
```

## Dashboard

3 páginas interativas:

- **Visão Geral:** KPIs + gráficos de barras e pizza com todos os dados
- **Por Estado:** Selecionar estado → gráficos e tabela detalhada
- **Comparativo:** 2016 vs 2025 para AL, PI, SE (estados em comum)

## Dados

- **2016:** 25.186 registros (AL, PI, SE)
- **2025:** 10.643 registros (AL, PI, SE)
- **Colunas:** ano, UF, entidade, nome, idade, raça/cor, zona, sexo, segmento

## Regenerar CSV Unificado

```bash
cd dados
python gerar_unificado_dashboard.py
```

## Fonte dos Dados

Dados públicos do programa EJA - Governo Federal do Brasil.