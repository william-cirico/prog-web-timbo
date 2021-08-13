/*
6) Crie uma função insereLivros(livros) que recebe um vetor de livros:
livro = {
    isbn,
    nome_autor,
    assunto,
    preco,
    quantidade_estoque,
    id_editora
}
e insere esses livros no banco de dados.

Utilize essa função para criar 5 livros.
*/
const format = require("pg-format");
const db = require("./db");

async function insereLivros(livros) {
    const livrosVetor = livros.map(livro => Object.values(livro));

    try {
        await db.query(format(`
            INSERT INTO 
                livros (nome_autor, assunto, preco, quantidade_estoque, id_editora)
            VALUES
                %L;
        `, livrosVetor));
        console.log("Livros cadastradas com sucesso!");
    } catch (error) {
        console.log(error.message);
    } finally {
        db.end();
    }
}

const livros = [
    {
        nome_autor: "Bernard Cornwell",
        assunto: "O senhor da guerra",
        preco: 46.47,
        quantidade_estoque: 20,
        id_editora: "48be435f-97b1-4774-884a-f6a2feed9979"
    },
    {
        nome_autor: "Robert C. Martin",
        assunto: "Código Limpo: Habilidades práticas do Agile Software",
        preco: 72.99,
        quantidade_estoque: 5,
        id_editora: "48be435f-97b1-4774-884a-f6a2feed9979"
    }
];

insereLivros(livros);