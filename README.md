Atlas Rápido

Aplicação web estática para pesquisa de países em tempo real. O projeto consulta a API pública countries.dev e apresenta informações geográficas e demográficas de diferentes países.

Demonstração

•
Aplicação publicada: adicione aqui o link do GitHub Pages

•
Repositório: github.com/nanaassss/Bootcamp

Sobre o projeto

O Atlas Rápido permite pesquisar países em português ou inglês e visualizar informações detalhadas sobre cada resultado. A interface adapta seus textos, mensagens e formatação numérica ao idioma selecionado.

Funcionalidades

•
Seleção do idioma de pesquisa entre Português e English.

•
Campo de busca e exemplos rápidos adaptados ao idioma selecionado.

•
Atualização automática dos textos principais, mensagens de status, rótulos dos resultados e subtítulo da página.

•
Exibição das seguintes informações sobre o país pesquisado:

•
Bandeira;

•
Nome;

•
Região;

•
Sub-região;

•
Capital;

•
População;

•
Área;

•
Moeda;

•
Idiomas;

•
Países fronteiriços.



•
Formatação de números de acordo com o idioma escolhido, utilizando pt-BR ou en-US.

•
Tratamento de diferentes situações, como:

•
Entradas vazias;

•
Nomes incompatíveis com o idioma selecionado;

•
Países não encontrados;

•
Falhas de conexão;

•
Erros retornados pela API.



Tecnologias utilizadas

•
HTML5 — estrutura da página;

•
CSS3 — layout, cores, responsividade e estados visuais;

•
JavaScript puro — lógica da aplicação, sem frameworks;

•
countries.dev — API pública de dados sobre países;

•
GitHub Pages — hospedagem da aplicação.

API utilizada

A aplicação utiliza o seguinte endpoint:

Plain Text


GET https://countries.dev/name/{nome-do-pais}



A API recebe o nome do país em inglês. Por isso, quando o usuário realiza uma pesquisa em português, o JavaScript converte o nome para o equivalente em inglês antes de fazer a requisição.

As traduções exibidas na interface são realizadas por meio de dicionários locais. A API não exige chave de autenticação, permitindo que o projeto seja executado como um site estático no GitHub Pages.

Estrutura do projeto

Plain Text


.
├── index.html   # Estrutura da página
├── script.js    # Pesquisa, validação de idioma e renderização dos resultados
├── style.css    # Layout, cores, responsividade e estados visuais
└── README.md    # Documentação do projeto



Como executar localmente

1. Clone o repositório

Bash


git clone https://github.com/nanaassss/Bootcamp.git
cd Bootcamp



2. Abra a aplicação

Abra o arquivo index.html diretamente no navegador. Durante o desenvolvimento, também é possível utilizar a extensão Live Server no Visual Studio Code.

Como o projeto é estático, não é necessário instalar dependências nem iniciar um servidor backend.

Como atualizar o projeto

Depois de modificar os arquivos, execute os comandos abaixo dentro da pasta clonada:

Bash


git status
git add index.html script.js style.css README.md
git commit -m "Atualiza documentação do projeto"
git push origin main



Após o envio, o GitHub Pages pode levar alguns instantes para publicar a nova versão. Caso o navegador ainda exiba a versão anterior, faça uma atualização forçada utilizando Ctrl + F5.

Autor

Desenvolvido por Geovanna Gabrielle, estudante de Análise e Desenvolvimento de Sistemas.

Licença e uso da API

Este projeto foi desenvolvido para fins de estudo. Os dados dos países são fornecidos pela API countries.dev, que deve ser consultada de acordo com sua documentação e disponibilidade.

Referências

1.
Documentação da API countries.dev

2.
Aplicação Atlas Rápido no GitHub Pages — adicione aqui o link da aplicação publicada

3.
Repositório Atlas Rápido no GitHub

