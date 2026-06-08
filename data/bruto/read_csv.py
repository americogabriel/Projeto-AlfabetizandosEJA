import pandas as pd

df_2025 = pd.read_csv('Alfabetizandos_2025.csv')
df_2016 = pd.read_csv('Alfabetizados_2016.CSV',sep=';',encoding='utf8')

## Filtro cada database para contar somente as linhas com as colunas 'uf_entidade' e 'UF_ENTIDADE' igual aos estados listados dentro da função .isin() que é usada para verificar a igualdade do valor com os valores da tupla
filtro_estado2025 = df_2025['UF_ENTIDADE'].isin(['AL','BA','CE','MA','PB','PE','PI','RN','SE'])
filtro_estado2016 = df_2016['uf_entidade'].isin(['AL','PI','SE'])

## Crio um novo database filtrado, usando a função do pandas .loc() que serve para filtrar tanto a partir de nome de colunas como utilizando filtros de coluna
df_final2025 = df_2025.loc[
    filtro_estado2025,
    ['UF_ENTIDADE','NOME_ENTIDADE','NO_ALFABETIZANDO','IDADE','RACA_COR','ZONA','SEGMENTO']
    ]
df_final2016 = df_2016.loc[
    filtro_estado2016,
    ['uf_entidade','nome_entidade','no_alfabetizando','sexo','idade','raca_cor','zona','situacao']
]

## transformo os dataframes filtrados em arquivo .csv
try:
    df_final2025.to_csv('Alfabetizados2025_filtrados.csv',index=False)
    df_final2016.to_csv('Alfabetizados2016_filtrados.csv',index=False)
    print("Arquivos criados com sucesso!!")
except Exception as error:
    print("Não foi possível criar os arquivos.")







