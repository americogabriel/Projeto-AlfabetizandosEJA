import pandas as pd
import os

# Caminhos
BASE = os.path.dirname(os.path.abspath(__file__))
ORIGINAIS = os.path.join(BASE, 'originais')

print("Lendo CSVs originais...")
df_2025 = pd.read_csv(os.path.join(ORIGINAIS, 'Alfabetizandos_2025.csv'))
df_2016 = pd.read_csv(os.path.join(ORIGINAIS, 'Alfabetizados_2016.csv'), sep=';')

print(f"  2025 original: {len(df_2025)} linhas, {list(df_2025.columns)}")
print(f"  2016 original: {len(df_2016)} linhas, {list(df_2016.columns)}")

# Filtrar estados
estados_2025 = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE']
estados_2016 = ['AL', 'PI', 'SE']

df_2025 = df_2025[df_2025['UF_ENTIDADE'].isin(estados_2025)].copy()
df_2016 = df_2016[df_2016['uf_entidade'].isin(estados_2016)].copy()

print(f"\nFiltrado:")
print(f"  2025 (9 estados NE): {len(df_2025)} linhas")
print(f"  2016 (AL, PI, SE):   {len(df_2016)} linhas")

# Padronizar colunas para minusculo
df_2025.columns = df_2025.columns.str.lower()
df_2016.columns = df_2016.columns.str.lower()

# Renomear no_alfabetizando -> nome
df_2025 = df_2025.rename(columns={'no_alfabetizando': 'nome'})
df_2016 = df_2016.rename(columns={'no_alfabetizando': 'nome'})

# Adicionar ano
df_2025['ano'] = 2025
df_2016['ano'] = 2016

# Colunas finais - apenas o que o dashboard usa
colunas = [
    'ano', 'uf_entidade', 'nome_entidade', 'nome',
    'idade', 'raca_cor', 'zona',
    'sexo', 'segmento'
]

# Preencher colunas faltantes com vazio
for c in colunas:
    if c not in df_2025.columns:
        df_2025[c] = ''
    if c not in df_2016.columns:
        df_2016[c] = ''

df_2025 = df_2025[colunas]
df_2016 = df_2016[colunas]

# Concatenar
df_final = pd.concat([df_2025, df_2016], ignore_index=True)

# Estatisticas
print(f"\n=== RESULTADO ===")
print(f"Total: {len(df_final)} linhas")
print(f"2025:  {len(df_2025)} linhas | Estados: {sorted(df_2025['uf_entidade'].unique())}")
print(f"2016:  {len(df_2016)} linhas | Estados: {sorted(df_2016['uf_entidade'].unique())}")
print(f"Colunas: {list(df_final.columns)}")

# Verificar dados
print(f"\nAmostra 2025:")
print(df_2025.head(3).to_string(index=False))
print(f"\nAmostra 2016:")
print(df_2016.head(3).to_string(index=False))

# Salvar
output = os.path.join(BASE, 'AlfabetizadosUnificados_Dashboard.csv')
df_final.to_csv(output, index=False, encoding='utf-8-sig')
print(f"\nSalvo: {output}")