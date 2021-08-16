/*
9) Crie uma função comprasPorCliente(id_cliente) que retorna todas as compras 
efetuadas por um cliente específico. As compras devem ter o nome do livro, data
e valor.
*/
const db = require("./db");

async function comprasPorCliente(id_cliente) {
    try {
        const { rows } = await db.query(`
        SELECT 
            l.assunto, 
            c.valor, 
            c.data 
        FROM 
            compras c
        INNER JOIN 
            livros l 
        ON 
            l.isbn = c.id_livro
        INNER JOIN 
            clientes cli 
        ON 
            cli.id = c.id_cliente
        WHERE 
            cli.id = $1;`, [id_cliente]);
    
    return rows;
    } catch (error) {
        console.log(error);
    } finally {
        db.end();
    }    
}

const id_cliente = "50be435f-97b1-4774-884a-f6a2feed9979";

comprasPorCliente(id_cliente)
    .then(result => console.log(result));
