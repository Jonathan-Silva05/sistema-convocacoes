-- Criação da tabela de convocações
CREATE TABLE public.convocacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_aluno TEXT NOT NULL,
    avaliador TEXT NOT NULL,
    data_prova DATE NOT NULL,
    horario_prova TIME NOT NULL,
    link_sala TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar segurança a nível de linha (Row Level Security)
ALTER TABLE public.convocacoes ENABLE ROW LEVEL SECURITY;

-- Criar política: Permitir que qualquer pessoa leia os dados (acesso público para consulta)
CREATE POLICY "Permitir leitura publica" 
ON public.convocacoes 
FOR SELECT 
USING (true);

-- As operações de INSERT, UPDATE e DELETE ficam implicitamente bloqueadas para usuários anônimos.
-- Apenas usuários autenticados no painel do Supabase ou usando a service_role (backend) poderão modificar os dados.