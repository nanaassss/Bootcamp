Atlas Rápido

Aplicação web estática para pesquisa de países em tempo real. O projeto consulta a API pública  e apresenta informações geográficas e demográficas de diferentes países.

Autor

Geovanna Gabrielle, estudante de Análise e Desenvolvimento de Sistemas.

Demonstração

•
Aplicação publicada: 

•
Repositório: 

Funcionalidades

A aplicação permite selecionar o idioma da pesquisa entre Português e English. Depois da seleção, o campo de busca e os exemplos rápidos aceitam somente nomes no idioma escolhido. A interface também atualiza automaticamente os textos principais, as mensagens de status, os rótulos dos resultados e o subtítulo da página.

Ao encontrar um país, a aplicação exibe sua bandeira, nome, região, sub-região, capital, população, área, moeda, idiomas e fronteiras. Os números são formatados de acordo com o idioma selecionado, usando pt-BR ou en-US.

A aplicação também trata entradas vazias, nomes incompatíveis com o idioma selecionado, países não encontrados, falhas de conexão e erros retornados pela API.

Tecnologias utilizadas

•
HTML5;

•
CSS3;

•
JavaScript puro, sem frameworks;

•
API pública countries.dev;

•
GitHub Pages para hospedagem.

API utilizada

A aplicação utiliza o endpoint abaixo:

Plain Text


GET https://countries.dev/name/{nome-do-pais}



A API recebe o nome do país em inglês. Por isso, quando o usuário pesquisa em português, o JavaScript converte o nome para o equivalente em inglês antes de fazer a requisição. A tradução exibida na tela é feita por dicionários locais.

A API não exige chave de autenticação, o que permite executar o projeto como um site estático no GitHub Pages.

Estrutura do projeto

Plain Text


.
├── index.html   # Estrutura da página
├── script.js    # Pesquisa, validação de idioma e renderização dos resultados
├── style.css    # Layout, cores, responsividade e estados visuais
└── README.md    # Documentação do projeto



Como executar localmente

Clone o repositório usando o Git:

Bash


git clone https://github.com/nanaassss/Bootcamp.git
cd Bootcamp



Depois, abra o arquivo index.html diretamente no navegador. Também é possível utilizar a extensão Live Server do Visual Studio Code para executar a página durante o desenvolvimento.

Como o projeto é estático, não é necessário instalar dependências ou iniciar um servidor backend.

Como atualizar o projeto

Depois de modificar os arquivos, execute os comandos abaixo dentro da pasta clonada:

Bash


git status
git add index.html script.js style.css README.md
git commit -m "Atualiza documentação do projeto"
git push origin main



Após o envio, o GitHub Pages pode levar alguns instantes para publicar a nova versão. Caso o navegador ainda mostre a versão anterior, faça uma atualização forçada com Ctrl + F5.

Licença e uso da API

Este projeto foi desenvolvido para fins de estudo. Os dados dos países são fornecidos pela API , que deve ser consultada de acordo com sua documentação e disponibilidade.

Referências

[1] Documentação da API countries.dev
[2] Aplicação Atlas Rápido no GitHub Pages
[3] Repositório Atlas Rápido no GitHub
