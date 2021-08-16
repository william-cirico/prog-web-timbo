/* 
10) Crie uma função livrosPorEditora(id_editora) que retorna todos os livros 
fornecidos por uma editora.
*/
const db = require("./db");

async function livrosPorEditora(id_editora) {
    try {
        const { rows } = await db.query("SELECT * FROM livros WHERE id_editora = $1;", [id_editora]);

        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        db.end();
    }    
}

const id_editora = "48be435f-97b1-4774-884a-f6a2feed9979";

livrosPorEditora(id_editora)
    .then(result => console.log(result));