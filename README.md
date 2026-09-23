# Atlas Rápido

## Autor

Geovanna Gabrielle, estudante de Análise e Desenvolvimento de Sistemas.

## Descrição

O Atlas Rápido é uma aplicação web para pesquisar países e consultar informações geográficas e demográficas. A aplicação consome a API [countries.dev](https://countries.dev/docs), persiste países favoritos no Supabase e roda empacotada em uma imagem Docker publicada no Docker Hub.

## Status das etapas do projeto

| Etapa | Situação | O que foi realizado |
| --- | --- | --- |
| **Etapa 01 — Aplicação web** | Concluída | Busca de países, exibição das informações, tradução dos campos, atalhos e publicação no GitHub Pages. |
| **Etapa 02A — Banco de dados** | Concluída no Supabase | Projeto criado, tabela `favoritos` criada e políticas RLS configuradas para permitir acesso pelo papel `anon`. |
| **Etapa 02B — Integração** | Implementada no código | O frontend foi conectado ao Supabase e recebeu as operações de salvar, listar e excluir países favoritos. |
| **Etapa 02C — Docker e Docker Hub** | Quase concluída | `Dockerfile` e `.dockerignore` criados, imagem construída e testada, publicada no Docker Hub com as tags `1.0` e `latest`, descrição do repositório preenchida (SQ3) e dois containers simultâneos testados (SQ4). Falta apenas publicar a tag `1.1` (SQ2) e commitar a evidência de print da SQ4. |

## Funcionalidades

- Busca de um país por nome em português ou inglês.
- Exibição de bandeira, região, sub-região, capital, população, área, moeda(s), idioma(s) e países fronteiriços.
- Tradução dos principais campos para português.
- Atalhos de busca rápida.
- Mensagens de erro para país não encontrado e falhas de conexão.
- Inclusão de um país na lista de favoritos.
- Listagem dos favoritos ao abrir ou atualizar a página.
- Exclusão de favoritos diretamente pela interface.

## API utilizada

- **countries.dev:** [https://countries.dev/docs](https://countries.dev/docs)
- Endpoint: `GET https://countries.dev/name/{nome-do-pais}`

A API REST Countries v3.1, utilizada originalmente, foi substituída porque a versão atual exige conta e chave de API. A countries.dev fornece os dados necessários sem autenticação, o que é adequado para este site estático.

## Etapa 02A e 02B — Supabase e integração

A integração foi implementada no `script.js` usando a biblioteca `@supabase/supabase-js` carregada por módulo ES:

```javascript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
```

A tabela `favoritos` no Supabase usa as colunas abaixo:

| Coluna | Tipo | Uso |
| --- | --- | --- |
| `id` | `bigint` | Identificador do registro (gerado automaticamente) |
| `criado_em` | `timestamptz` | Data de criação, com valor padrão `now()` |
| `nome_item` | `text` | Nome do país favorito |
| `dados_extra` | `jsonb` | Capital, bandeira e região do país |

### Configuração das credenciais públicas

No início do `script.js`:

```javascript
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_PUBLIC";
```

Deve ser utilizada somente a chave pública `anon`. A chave `service_role` não deve ser colocada no frontend, no GitHub ou no Docker.

### Operações implementadas

- **Create:** o botão **Favoritar país** insere o nome e os dados complementares na tabela `favoritos`.
- **Read:** a seção **Meus países favoritos** consulta e lista os registros ordenados pelos mais recentes.
- **Delete:** o botão **Excluir** remove o registro selecionado pelo `id`.

### Políticas de acesso (RLS)

As políticas RLS configuradas no Supabase permitem leitura e escrita pelo papel `anon`, conforme o escopo didático desta entrega.

> **Limitação conhecida:** a tabela está acessível publicamente pelo papel `anon` para leitura e escrita via RLS. Não há autenticação ou isolamento por usuário.

## Etapa 02C — Docker e Docker Hub

A aplicação é servida por um **Nginx** dentro de um container, a partir da imagem `nginx:alpine`, que copia `index.html`, `style.css` e `script.js` para a pasta padrão do servidor.

### Rodando localmente

```bash
docker build -t atlas-rapido .
docker run -d -p 8080:80 --name atlas-rapido-container atlas-rapido
```

Acesse [http://localhost:8080](http://localhost:8080).

### Imagem publicada no Docker Hub

- Repositório: [https://hub.docker.com/r/nanaaass/atlas-rapido](https://hub.docker.com/r/nanaaass/atlas-rapido)
- Comando para qualquer pessoa rodar, em qualquer servidor:

```bash
docker run -d -p 8080:80 nanaaass/atlas-rapido:latest
```

## Sidequests

| Sidequest | Status | Evidência |
| --- | --- | --- |
| **SQ1 — .dockerignore** | Concluída | Arquivo `.dockerignore` na raiz do repositório, excluindo `.git`, `README.md`, arquivos de sistema e as próprias evidências (`*.png`, `evidencias/`). Isso deixa a imagem menor e o build mais rápido, porque o Docker não perde tempo copiando (nem enviando pro contexto de build) arquivos que não são necessários para o site rodar dentro do container. |
| **SQ2 — Versionamento de imagem** | Em andamento | Tags `1.0` e `latest` publicadas no Docker Hub. Tag `1.1` (após melhoria) ainda pendente. |
| **SQ3 — Descrição no Docker Hub** | Concluída | Overview do repositório preenchido com descrição da aplicação, o comando `docker run` pronto para copiar e o link do repositório no GitHub. |
| **SQ4 — Explorando a orquestração** | Em andamento | Dois containers rodados simultaneamente nas portas 8080 e 8081 (`atlas-rapido-container` e `atlas-rapido-container-2`), confirmados com `docker ps`. Print pendente de commit em `evidencias/docker-ps-sq4.png`. Reflexão abaixo. |

### SQ4 — Se eu tivesse 100 containers, como gerenciaria?

Nesta etapa eu rodei dois containers da mesma imagem ao mesmo tempo, um na porta 8080 e outro na 8081, usando dois comandos `docker run` separados. Só isso já deu um pouco de trabalho manual: escolher a porta de cada um, dar um nome diferente pra cada container, lembrar de rodar o comando duas vezes.

Se eu tivesse 100 containers pra gerenciar, fazer isso manualmente — escolhendo porta por porta e digitando `docker run` cem vezes — seria inviável, e pior: se um desses containers travasse no meio da madrugada, ninguém ia perceber ou reiniciar ele sozinho. É exatamente esse problema que o **Kubernetes** resolve. Em vez de eu rodar containers um por um com `docker run`, eu descrevo num arquivo de configuração quantas cópias (réplicas) da minha aplicação eu quero rodando, e o Kubernetes cuida do resto: ele distribui esses containers entre várias máquinas de um **cluster** (um conjunto de servidores trabalhando juntos), agrupa cada container dentro de um **pod** (a menor unidade que o Kubernetes gerencia, podendo ter um ou mais containers), e fica de olho neles — se um pod cair, o Kubernetes sobe outro automaticamente pra manter o número de réplicas que eu pedi. Ou seja, o que eu fiz na mão com dois containers é basicamente o mesmo princípio que o Kubernetes automatiza em larga escala, só que sem eu precisar ficar digitando `docker run` pra cada cópia.

## Como executar localmente

### Direto no navegador (sem Docker)

1. Clone o repositório:
   ```bash
   git clone https://github.com/nanaassss/Bootcamp.git
   cd Bootcamp
   ```
2. Configure `SUPABASE_URL` e `SUPABASE_ANON_KEY` no início do `script.js`.
3. Use um servidor local (o `script.js` usa `import` como módulo ES):
   ```bash
   python3 -m http.server 8000
   ```
4. Acesse [http://localhost:8000](http://localhost:8000).

### Via Docker (sem instalar nada além do Docker)

```bash
docker run -d -p 8080:80 nanaaass/atlas-rapido:latest
```

Acesse [http://localhost:8080](http://localhost:8080).

## Arquivos alterados na integração

- `index.html`: carregamento do script como módulo, botão de favoritar e seção de favoritos.
- `script.js`: cliente Supabase e operações de criação, leitura e exclusão.
- `style.css`: estilos do botão, da lista e das mensagens de status.
- `Dockerfile` / `.dockerignore`: empacotamento da aplicação para rodar via Nginx em container.

## Limitações conhecidas

- A countries.dev utiliza dados abertos mantidos pela comunidade, portanto alguns números de população podem estar desatualizados.
- O dicionário local de traduções não cobre necessariamente todos os países e termos.
- A persistência depende da disponibilidade da API do Supabase.
- A tabela está publicamente acessível pelo papel `anon`, conforme descrito na seção de RLS.

## Links

- Aplicação no GitHub Pages: [https://nanaassss.github.io/Bootcamp](https://nanaassss.github.io/Bootcamp)
- Repositório no GitHub: [https://github.com/nanaassss/Bootcamp](https://github.com/nanaassss/Bootcamp)
- Repositório no Docker Hub: [https://hub.docker.com/r/nanaaass/atlas-rapido](https://hub.docker.com/r/nanaaass/atlas-rapido)

## Próximas tarefas pendentes

- Publicar a tag `1.1` no Docker Hub, após alguma melhoria na aplicação (SQ2).
- Subir e commitar o print `evidencias/docker-ps-sq4.png` com os dois containers simultâneos (SQ4).

## Melhorias futuras

- Criar autenticação de usuários.
- Associar favoritos ao usuário autenticado.
- Restringir as políticas RLS por `user_id`.
- Adicionar atualização de registros e uma configuração de ambiente mais segura para desenvolvimento.

## Licença

Projeto acadêmico desenvolvido para o Bootcamp 2.
