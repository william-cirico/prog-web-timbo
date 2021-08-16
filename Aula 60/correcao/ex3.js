/*
Crie uma função insereCliente(cliente) que recebe o objeto cliente:
{
    nome,
    email,
    telefone,
    numero_documento,
    tipo_pessoa,
    rua,
    numero,
    cidade,
    estado,
    cep
}
*/
// @ts-check
const db = require("./db");

/**
 * Dados e endereço do cliente
 * @typedef {Object} Cliente 
 * @property {string} id
 * @property {string} nome 
 * @property {string} email
 * @property {string} telefone
 * @property {string} numero_documento
 * @property {string} tipo_pessoa
 * @property {string} rua
 * @property {number} numero
 * @property {string} cidade
 * @property {string} estado
 * @property {string} cep
 */

/**
 * Insere um cliente e o seu endereço no banco de dados
 * @param {Cliente} cliente 
 */
async function insereCliente(cliente) {
    const dadosCliente = [
        cliente.id,
        cliente.nome, 
        cliente.email, 
        cliente.telefone, 
        cliente.numero_documento,
        cliente.tipo_pessoa
    ];
    
    const enderecoCliente = [
        cliente.rua,
        cliente.numero,
        cliente.cidade,
        cliente.estado,
        cliente.cep
    ];

    try {
        await db.query("BEGIN;");

        const {rows} = await db.query(`            
            INSERT INTO 
                clientes (id, nome, email, telefone, numero_documento, tipo_pessoa)
            VALUES 
                ($1, $2, $3, $4, $5, $6)
            RETURNING id;`, dadosCliente);
        
        await db.query(`
            INSERT INTO 
                enderecos (rua, numero, cidade, estado, cep, id_cliente)
            VALUES 
                ($1, $2, $3, $4, $5, $6);`, [...enderecoCliente, rows[0].id]);

        await db.query(" COMMIT;");        
        console.log("Cliente foi cadastrado com sucesso!");
    } catch (error) {
        await db.query("ROLLBACK;")
        console.log(error.message);
    } finally {
        db.end();
    }
}

/** @type {Cliente} */
const cliente = {
    id: "50be435f-97b1-4774-884a-f6a2feed9979",
    nome: "Pedro",
    email: "pedro@email.com",
    telefone: "(47) 9 8444-3320",
    numero_documento: "123.123.123-12",
    tipo_pessoa: "PF",
    rua: "R. Duque de Caxias",
    numero: 830,
    cidade: "Timbó",
    estado: "SC",
    cep: "89120-000"
};

insereCliente(cliente);