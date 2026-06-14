import pandas as pd

df_2025 = pd.read_csv('Alfabetizados2025_filtrados.csv')
df_2016 = pd.read_csv('Alfabetizados2016_filtrados.csv')

## Crio a coluna ano para as duas tabelas, e cada uma é preenchida com 2025 e 2016 respectivamente
df_2025['ano'] = 2025
df_2016['ano'] = 2016

## padronizo o nome das colunas das duas tabela para letras minúsculas, para não dar atrito quando juntarem as linhas
df_2025.columns = df_2025.columns.str.lower()
df_2016.columns = df_2016.columns.str.lower()

df_unificado = pd.concat([df_2025, df_2016],ignore_index=True)

try:
    df_unificado.to_csv("AlfabetizadosUnificados.csv",index=False,encoding='utf-8-sig')
    print('Arquivo gerado com sucesso!')
except Exception as erro:
    print(f"Não foi possível gerar o arquivo unificado csv: erro {erro}")

