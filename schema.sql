-- =====================================================================
-- schema.sql
-- Tabela de usuários/candidatos do Emprega Mais
-- =====================================================================

CREATE TABLE IF NOT EXISTS usuarios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,

    cpf VARCHAR(14) NOT NULL UNIQUE,

    celular VARCHAR(20) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    senha VARCHAR(255) NOT NULL,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- =====================================================================
-- DADOS DE EXEMPLO
-- Opcional.
--
-- A senha abaixo é apenas um exemplo de HASH.
-- Não coloque senhas reais diretamente neste arquivo.
-- =====================================================================

INSERT INTO usuarios (
    nome,
    cpf,
    celular,
    email,
    senha
)

SELECT
    'Gustavo Fabregas',
    '123.456.789-01',
    '(84) 99999-9999',
    'gustavo@email.com',
    '$2b$10$exemploHashDaSenha'

WHERE NOT EXISTS (

    SELECT 1
    FROM usuarios

);