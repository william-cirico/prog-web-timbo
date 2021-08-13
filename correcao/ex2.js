const db = require("./db");

/*
2) Faça um script que crie as seguintes tabelas no banco de dados:

clientes(id, nome, email, telefone, numero_documento, tipo_pessoa, pontos)
enderecos(id, rua, numero, cidade, estado, cep, id_cliente)
livros(isbn, nome_autor, assunto, quantidade_estoque, preco, id_editora)
compras(id_cliente, id_livro, data, valor)
editoras(id, nome_gerente, telefone)

Os identificadores devem ser do tipo UUID e devem ser gerados automaticamente pelo
banco de dados:
https://www.postgresql.org/docs/13/functions-uuid.html
https://node-postgres.com/features/types
*/
const query = `
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
        data timestamp DEFAULT NOW(),
        valor numeric NOT NULL,
        PRIMARY KEY (id_cliente, id_livro, data)      
    );
`;

(async () => {
    try {
        await db.query(query);
        console.log("Tabelas criadas com sucesso!");
    } catch (error) {
        console.log(error.message);        
    } finally {
        db.end();
    }
})();