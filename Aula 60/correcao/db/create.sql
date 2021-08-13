DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;

CREATE TYPE tipo_pessoa AS ENUM ('PF', 'PJ');

CREATE TABLE IF NOT EXISTS clientes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome text NOT NULL,
    email text NOT NULL UNIQUE,
    telefone text NOT NULL UNIQUE,
    numero_documento text NOT NULL,
    tipo_pessoa tipo_pessoa NOT NULL,
    pontos integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS enderecos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    rua text NOT NULL,
    numero integer NOT NULL,
    cidade text NOT NULL,
    estado text NOT NULL,
    cep TEXT NOT NULL,
    id_cliente uuid NOT NULL REFERENCES clientes 
);    

CREATE TABLE IF NOT EXISTS editoras (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_gerente text NOT NULL,
    telefone text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS livros (
    isbn uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_autor text NOT NULL,
    assunto text NOT NULL,
    quantidade_estoque integer NOT NULL,
    preco numeric NOT NULL,
    id_editora uuid NOT NULL REFERENCES editoras
);

CREATE TABLE IF NOT EXISTS compras (
    id_cliente uuid REFERENCES clientes,
    id_livro uuid REFERENCES livros,
    data timestamp,
    valor numeric NOT NULL,
    PRIMARY KEY (id_cliente, id_livro, data)      
);