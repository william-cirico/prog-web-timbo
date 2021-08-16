/*
7) Crie uma função obtemLivros(livros) que recebe como parâmetro um vetor com
identificadores de livros. Essa função deve retornar um vetor com todos os 
livros presentes no parâmetro. 
*/
// @ts-check
const db = require("./db");
const format = require("pg-format");

/**
 * Obtem os livros pelo isbn
 * @param {Array<string>} livros - Um vetor com isbn dos livros
 */
async function obtemLivros(livros) {
    try {
        const { rows } = await db.query(format(`
            SELECT * FROM livros WHERE isbn IN (%L);
        `, livros));

        return rows;
    } catch (error) {
        console.log(error.message);
    } finally {
        db.end();
    }
}

const livros = ["38be435f-97b1-4774-884a-f6a2feed9979", "39be435f-97b1-4774-884a-f6a2feed9979"];

obtemLivros(livros)
    .then(result => console.log(result));

module.exports = obtemLivros;