/*
8) Crie uma função comprar(dados_compra) que recebe um objeto dados_compra
dados_compra = {
    id_cliente,
    livros (vetor com os identificadores dos livros comprados pelo cliente),
    data (data atual),
    valor (calculado através do preço dos livros)
}
e insere um registro na tabela compras e atualiza os pontos daquele cliente:
O cliente recebe um ponto a cada 10 reais gastos.
*/
const format = require("pg-format");
const db = require("./db");

async function obtemLivros(livros) {
    try {
        const { rows } = await db.query(format(`
            SELECT * FROM livros WHERE isbn IN (%L);
        `, livros));

        return rows;
    } catch (error) {
        console.log(error.message);
    }
}

async function comprar(dados_compra) {
    try {
        await db.query("BEGIN;");

        const livros = await obtemLivros(dados_compra.livros);

        let totalLivros = 0;
        for (let livro of livros) {
            totalLivros += +livro.preco;

            await db.query(`
                INSERT INTO 
                    compras
                VALUES 
                    ($1, $2, $3, $4)`, [dados_compra.id_cliente, livro.isbn, dados_compra.data, livro.preco]);            
        }

        console.log(totalLivros);

        const { rows } = await db.query("SELECT pontos FROM clientes WHERE id=$1", [dados_compra.id_cliente]);

        const pontosAtualizados = parseInt(totalLivros / 10) + rows[0].pontos;

        await db.query(`UPDATE clientes SET pontos = $1 WHERE id = $2`, [pontosAtualizados, dados_compra.id_cliente]);
        
        await db.query("COMMIT;");
        console.log("Compras cadastradas");
    } catch (err) {
        await db.query("ROLLBACK;");
        console.log(err);
    } finally {
        db.end();
    }    
}

const dados_compra = {
    id_cliente: "50be435f-97b1-4774-884a-f6a2feed9979",
    livros: ["39be435f-97b1-4774-884a-f6a2feed9979"],
    data: new Date()
}

comprar(dados_compra);