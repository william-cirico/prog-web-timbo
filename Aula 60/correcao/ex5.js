/*
5) Crie uma função insereEditoras(editoras) que recebe um vetor de editoras:
editora = {
    nome_gerente,
    telefone
}
e insere essas editoras no banco de dados.

Utilize essa função para criar 5 editoras.
*/
const format = require("pg-format");
const db = require("./db");

async function insereEditoras(editoras) {
    const editorasVetor = editoras.map(editora => [editora.id, editora.nome_gerente, editora.telefone]);

    try {
        await db.query(format(`
            INSERT INTO 
                editoras (id, nome_gerente, telefone)
            VALUES
                %L;
        `, editorasVetor));
        console.log("Editoras cadastradas com sucesso!");
    } catch (error) {
        console.log(error.message);
    } finally {
        db.end();
    }
}

const editoras = [
    {
        id: "48be435f-97b1-4774-884a-f6a2feed9979",
        nome_gerente: "Thiago",
        telefone: "(47) 9 1238-1231"
    },
    {
        id: "48be435f-97b1-4774-884a-f6a2feed9978",
        nome_gerente: "Davi",
        telefone: "(47) 9 1568-1231"
    }
];

insereEditoras(editoras);