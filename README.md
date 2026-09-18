# Atlas Rápido

## Autor
Geovanna Gabrielle, estudante Análise e Desenvolvimento de Sistemas.

## Descrição
Aplicação web que permite buscar um país pelo nome e exibe informações
geográficas e demográficas consumindo a API countries.dev.

## API utilizada
- countries.dev — https://countries.dev/docs
- Endpoint usado: `GET https://countries.dev/name/{nome-do-pais}`
- Observação: a REST Countries (restcountries.com) v3.1, usada originalmente, foi
  descontinuada e hoje exige conta e chave de API (v5). Como o projeto roda como site
  estático no GitHub Pages (sem backend para esconder uma chave), optamos pela countries.dev,
  que fornece os mesmos dados sem necessidade de autenticação.

## Funcionalidades
- Busca de um país por nome através de um campo de texto (aceita nomes em português,
  ex: "frança", "japão")
- Exibição de bandeira, região/sub-região, nome, capital, população, área,
  moeda(s), idioma(s) e países fronteiriços
- Tradução para português dos principais campos (nome do país, região, idiomas,
  capital e moeda), já que a API devolve tudo originalmente em inglês
- Atalhos de busca rápida para alguns países
- Tratamento de erros: mensagem amigável quando o país não é encontrado
  (404) ou quando a API/conexão falha, sem quebrar a tela

## Limitações conhecidas
- A countries.dev é construída sobre dados abertos (GeoNames), mantidos pela comunidade
  e não atualizados em tempo real — por isso números de população podem estar
  desatualizados em alguns países.
- As traduções para português (nomes de países, capitais, moedas etc.) cobrem os países
  e termos mais comuns através de um dicionário local no `script.js`; um país fora dessa
  lista ainda aparece com o nome original em inglês.

## Como executar localmente
1. Clone o repositório: `git clone https://github.com/nanaassss/Bootcamp.git`
2. Abra o arquivo `index.html` no navegador (duplo clique ou "Abrir com")

## Links
- Aplicação no GitHub Pages: https://nanaassss.github.io/Bootcamp
- Repositório no GitHub: https://github.com/nanaassss/Bootcamp
