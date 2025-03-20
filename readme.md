# Algoritmo de Categorizacao de Produtos de Supermercado

## Contexto

Este projeto tem como objetivo desenvolver um algoritmo para categorizar produtos de supermercados e identificar produtos equivalentes, mesmo quando seus nomes possuem pequenas variações.

## Tecnologias Utilizadas

- Node.js
- JavaScript

## Como Funciona

O algoritmo analisa os nomes dos produtos e os agrupa em categorias considerando:

1. Ordem das palavras trocadas.
2. Pequenas variações na descrição.
3. Diferenças de capitalização.
4. Separação de produtos com tamanhos, tipos ou marcas diferentes.

## Estrutura do Código

O código principal está no arquivo `categorizeProducts.js`, onde:

- Lemos os dados de entrada em JSON.
- Normalizamos os títulos dos produtos.
- Comparamos os produtos para identificar equivalências.
- Agrupamos os produtos em categorias.
- Geramos um JSON de saída com os produtos categorizados.

## Exemplo de Entrada

```json
[
  {
    "id": 1,
    "title": "Leite Integral Piracanjuba 1L",
    "supermarket": "Supermercado A"
  },
  {
    "id": 2,
    "title": "Leite Piracanjuba Integral 1L",
    "supermarket": "Supermercado B"
  },
  {
    "id": 3,
    "title": "Leite Integral Italac 1L",
    "supermarket": "Supermercado A"
  }
]
```

## Exemplo de Saída

```json
[
  {
    "category": "Leite Integral Piracanjuba 1L",
    "count": 2,
    "products": [
      {
        "title": "Leite Integral Piracanjuba 1L",
        "supermarket": "Supermercado A"
      },
      {
        "title": "Leite Piracanjuba Integral 1L",
        "supermarket": "Supermercado B"
      }
    ]
  },
  {
    "category": "Leite Integral Italac 1L",
    "count": 1,
    "products": [
      { "title": "Leite Integral Italac 1L", "supermarket": "Supermercado A" }
    ]
  }
]
```

## Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/categorizacao-produtos.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o script:
   ```bash
   node categorizeProducts.js
   ```

## Critérios de Avaliação

- **Precisão**: Identificar corretamente produtos equivalentes.
- **Performance**: Processamento eficiente dos dados.
- **Legibilidade**: Código bem estruturado e fácil de entender.

## Autor

Desenvolvido por Leonardo Tolotti
