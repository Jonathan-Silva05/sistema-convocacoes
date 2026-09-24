# Especificação: Sistema de Convocação para Provas Orais NEPLE

## 1. Visão Geral
Aplicação web estática para publicação e consulta de horários de provas orais do NEPLE. O objetivo é permitir que os alunos consultem rapidamente quando e onde (ou em qual link) ocorrerá a sua avaliação.

## 2. Público-Alvo
- **Alunos (Candidatos):** Precisam visualizar a lista de convocações ou buscar pelo seu nome para encontrar o horário da prova.
- **Administração/Professores:** Inserem os dados das convocações no banco de dados (via painel do Supabase).

## 3. Stack Tecnológico
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
- **Backend / Banco de Dados:** Supabase (PostgreSQL + API).
- **Hospedagem:** GitHub Pages.

## 4. Funcionalidades Principais (Frontend)
- **Visualização de Convocações:** Uma tabela ou lista em formato de cards exibindo as próximas provas.
- **Busca/Filtro:** Um campo de texto onde o aluno digita o seu nome e a lista filtra os resultados em tempo real.
- **Detalhes da Convocação:** Cada registro deve exibir:
  - Nome do Aluno
  - Avaliador (Professor)
  - Data da Prova
  - Horário da Prova
  - Link da Sala Virtual (Google Meet, Zoom, etc.) ou Local Físico.

## 5. Regras de Segurança
- O frontend apenas fará requisições de LEITURA (SELECT) para o Supabase utilizando a `anon_key` (chave pública).
- A edição, exclusão e inserção de dados serão feitas exclusivamente pelos administradores diretamente no painel do Supabase.
- A configuração de RLS (Row Level Security) deve bloquear operações de escrita vindas de usuários anônimos.