# Atlas Rápido

## Autor

Geovanna Gabrielle, estudante de Análise e Desenvolvimento de Sistemas.

## Descrição

O Atlas Rápido é uma aplicação web para pesquisar países e consultar informações geográficas e demográficas. A aplicação consome a API [countries.dev](https://countries.dev/docs) e está evoluindo da consulta simples de países para uma aplicação com persistência de favoritos no Supabase.

## Status das etapas do projeto

| Etapa | Situação | O que foi realizado |
| --- | --- | --- |
| **Etapa 01 — Aplicação web** | Concluída | Busca de países, exibição das informações, tradução dos campos, atalhos e publicação no GitHub Pages. |
| **Etapa 02A — Banco de dados** | Concluída no Supabase | Projeto criado, tabela `favoritos` criada e políticas RLS configuradas para permitir acesso pelo papel `anon`. |
| **Etapa 02B — Integração** | Implementada no código | O frontend foi conectado ao Supabase e recebeu as operações de salvar, listar e excluir países favoritos. |
| **Etapa 02C — Docker e Docker Hub** | Pendente | Ainda é necessário criar/testar o `Dockerfile`, criar o `.dockerignore`, publicar a imagem e executar os sidequests solicitados. |

Esta documentação não considera a conteinerização como concluída até que a imagem seja construída, testada e publicada no Docker Hub.

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

A configuração já realizada no Supabase utiliza a tabela `favoritos`. A aplicação foi ajustada para usar exatamente essa tabela e as colunas abaixo:

| Coluna | Tipo sugerido | Uso |
| --- | --- | --- |
| `id` | `bigint` ou `uuid` | Identificador do registro |
| `criado_em` | `timestamptz` | Data de criação, preferencialmente com valor padrão `now( )` |
| `nome_item` | `text` | Nome do país favorito |
| `dados_extra` | `jsonb` | Capital, bandeira e região do país |

### Configuração das credenciais públicas

No início do `script.js`, substituir os valores de exemplo pelos dados do projeto em **Project Settings → API**:

```javascript
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_PUBLIC";
```

Deve ser utilizada somente a chave pública `anon`. A chave `service_role` não deve ser colocada no frontend, no GitHub ou no Docker.

### Operações implementadas no Atlas Rápido

A integração executa as operações mínimas solicitadas na etapa:

- **Create:** o botão **Favoritar país** insere o nome e os dados complementares na tabela `favoritos`.

- **Read:** a seção **Meus países favoritos** consulta e lista os registros ordenados pelos mais recentes.

- **Delete:** o botão **Excluir** remove o registro selecionado pelo `id`.

Depois de inserir ou excluir um registro, a lista é carregada novamente para refletir o estado do banco.

### Políticas de acesso (RLS )

As políticas RLS configuradas no Supabase permitem leitura e escrita pelo papel `anon`, conforme o escopo didático desta entrega.

> **Limitação conhecida:** a tabela está acessível publicamente pelo papel `anon` para leitura e escrita via RLS. Não há autenticação ou isolamento por usuário; qualquer cliente com a chave pública pode consultar, inserir, atualizar e excluir registros.

Essa configuração atende à etapa atual, mas não é recomendada para produção. Em uma evolução futura, deve ser adicionada autenticação, um campo `user_id` e políticas RLS que limitem cada registro ao usuário autenticado.

## Como executar e testar a integração

1. Clone o repositório:

   ```bash
   git clone https://github.com/nanaassss/Bootcamp.git
   cd Bootcamp
   ```

1. Configure `SUPABASE_URL` e `SUPABASE_ANON_KEY` no início do `script.js`, usando os dados do projeto Supabase que já foi criado.

1. Utilize um servidor local, pois o `script.js` usa `import` e a biblioteca do Supabase como módulo ES;

   ```bash
   python3 -m http.server 8000
   ```

1. Acesse [http://localhost:8000](http://localhost:8000), pesquise um país e teste os botões **Favoritar país**, **Atualizar** e **Excluir**.

1. Para comprovar a persistência, salve um país, atualize a página e verifique se ele continua na seção **Meus países favoritos**.

1. Para comprovar a exclusão, clique em **Excluir** e confirme no **Table Editor** do Supabase que o registro foi removido.

Se as credenciais ainda forem os valores de exemplo, a pesquisa de países continuará funcionando, mas a lista de favoritos exibirá uma mensagem solicitando a configuração do Supabase.

## Arquivos alterados na integração

- `index.html`: carregamento do script como módulo, botão de favoritar e seção de favoritos.

- `script.js`: cliente Supabase e operações de criação, leitura e exclusão.

- `style.css`: estilos do botão, da lista e das mensagens de status.

## Limitações conhecidas

- A countries.dev utiliza dados abertos mantidos pela comunidade, portanto alguns números de população podem estar desatualizados.

- O dicionário local de traduções não cobre necessariamente todos os países e termos.

- A persistência depende da disponibilidade da API do Supabase.

- A tabela está publicamente acessível pelo papel `anon`, conforme descrito na seção de RLS.

## Links

- Aplicação no GitHub Pages: [https://nanaassss.github.io/Bootcamp](https://nanaassss.github.io/Bootcamp)

- Repositório no GitHub: [https://github.com/nanaassss/Bootcamp](https://github.com/nanaassss/Bootcamp)

## Etapa 02C — Próximas tarefas pendentes

- Criar o `Dockerfile` para servir o site com Nginx.

- Criar o `.dockerignore`.

- Construir e testar a imagem localmente com `docker build` e `docker run`.

- Publicar a imagem versionada no Docker Hub.

- Preencher a descrição da imagem no Docker Hub.

- Executar dois containers simultaneamente em portas diferentes para atender ao SQ4.

- Registrar as evidências dos sidequests no README.

## Melhorias futuras

- Criar autenticação de usuários.

- Associar favoritos ao usuário autenticado.

- Restringir as políticas RLS por `user_id`.

- Adicionar atualização de registros e uma configuração de ambiente mais segura para desenvolvimento.

## Licença

Projeto acadêmico desenvolvido para o Bootcamp II.