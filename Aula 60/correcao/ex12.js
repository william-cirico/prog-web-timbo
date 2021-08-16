/*
12) Crie uma função obtemMelhorCliente() que mostra no console o cliente que 
mais gastou na livraria. Deve ser exibido o nome do cliente, telefone, email
e as compras do cliente. As compras devem ter o nome do livro, data e valor.
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
    }   
}

async function obtemMelhorCliente() {
    try {
        const { rows } = await db.query(`
        SELECT 
            id, nome, telefone, email 
        FROM 
            clientes
        WHERE 
            id = (SELECT id_cliente FROM clientes cli
                INNER JOIN compras c ON c.id_cliente = cli.id
                GROUP BY id_cliente
                ORDER BY sum(valor) DESC
                LIMIT 1);`);
    
        const compras = await comprasPorCliente(rows[0].id);


        console.log(rows[0], compras);
    } catch (error) {
        console.log(error);
    } finally {
        db.end();
    }
}

obtemMelhorCliente();