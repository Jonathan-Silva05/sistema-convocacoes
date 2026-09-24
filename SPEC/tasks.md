# Plano de Desenvolvimento em Tarefas Executáveis

## Tarefa 1: Estruturação Básica do Projeto
- Configurar o arquivo `index.html` importando as folhas de estilo do CSS e o script do JavaScript.
- Importar a biblioteca do Supabase via CDN (`@supabase/supabase-js`) no HTML.

## Tarefa 2: Construção da Interface (UI)
- Utilizar a estrutura visual gerada na pasta `THEME`.
- Criar o cabeçalho (Header) com o título "Convocações - Provas Orais NEPLE".
- Criar uma barra de pesquisa (input de texto) para filtrar convocações por nome de aluno.
- Criar o container principal (`<div id="convocacoes-list">`) onde a lista ou tabela será renderizada.

## Tarefa 3: Integração com Supabase (Configuração)
- Criar o arquivo `app.js`.
- Configurar a inicialização do cliente Supabase usando as credenciais fornecidas no prompt (URL e Chave Pública).

## Tarefa 4: Lógica de Leitura de Dados (Fetch)
- Criar uma função no `app.js` para buscar (SELECT) todos os registros da tabela `convocacoes` ordenados por `data_prova` e `horario_prova`.
- Tratar possíveis erros de conexão e exibir mensagens de erro amigáveis no HTML (ex: "Não foi possível carregar as convocações.").

## Tarefa 5: Renderização e Filtro dinâmico
- Criar uma função para renderizar os dados recebidos do Supabase no container `#convocacoes-list`.
- Formatar a data (DD/MM/AAAA) e o horário (HH:MM) visualmente para o padrão brasileiro.
- Adicionar um *Event Listener* na barra de pesquisa que filtre os dados renderizados em tempo real conforme o usuário digita o nome do aluno.