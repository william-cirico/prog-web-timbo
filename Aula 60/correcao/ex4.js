/*
4) Crie uma função insereClientes(clientes) que recebe um vetor de clientes
e insere esses clientes no banco de dados.
(Deve inserir o registro na tabela clientes e na tabela enderecos).

Utilize essa função para criar 4 clientes.
*/

// @ts-check
const format = require("pg-format");
const db = require("./db");


/**
 * Dados e endereço do cliente
 * @typedef {Object} Cliente 
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
 * Insere vários clientes no banco de dados
 * @param {Array<Cliente>} clientes 
 */
async function insereClientes(clientes) {
    // Separando clientes
    const clientesVetor = [],
          enderecosVetor = [];
    
    clientes.forEach(cliente => {
        clientesVetor.push([
            cliente.nome, 
            cliente.email, 
            cliente.telefone, 
            cliente.numero_documento,
            cliente.tipo_pessoa
        ]);

        enderecosVetor.push([
            cliente.rua,
            cliente.numero,
            cliente.cidade,
            cliente.estado,
            cliente.cep
        ]);
    });

    try {
        await db.query("BEGIN;");

        const {rows} = await db.query(format(`            
            INSERT INTO 
                clientes (nome, email, telefone, numero_documento, tipo_pessoa)
            VALUES 
                %L
            RETURNING id;`, clientesVetor));
        

        // Adicionando os id_usuario
        for (let i = 0; i < enderecosVetor.length; i++) {
            enderecosVetor[i] = [...enderecosVetor[i], rows[i].id];
        }
        
        await db.query(format(`
            INSERT INTO 
                enderecos (rua, numero, cidade, estado, cep, id_cliente)
            VALUES 
                %L;`, enderecosVetor));

        await db.query(" COMMIT;");        
        console.log("Clientes foram cadastrados com sucesso!");
    } catch (error) {
        await db.query("ROLLBACK;")
        console.log(error.message);
    } finally {
        db.end();
    }
}

/** @type Array<Cliente> */
const clientes = [
    {
        nome: "Marcos",
        email: "marcos@email.com",
        telefone: "(47) 9 8344-3320",
        numero_documento: "113.123.123-12",
        tipo_pessoa: "PF",
        rua: "R. Duque de Caxias",
        numero: 833,
        cidade: "Timbó",
        estado: "SC",
        cep: "89122-000"
    },
    {
        nome: "Maria",
        email: "maria@email.com",
        telefone: "(47) 9 8412-3320",
        numero_documento: "144.123.123-12",
        tipo_pessoa: "PF",
        rua: "R. Duque de Caxias",
        numero: 838,
        cidade: "Timbó",
        estado: "SC",
        cep: "89130-000"
    },
    {
        nome: "João",
        email: "joao@email.com",
        telefone: "(47) 9 8809-3320",
        numero_documento: "123.123.000-12",
        tipo_pessoa: "PF",
        rua: "R. Duque de Caxias",
        numero: 830,
        cidade: "Timbó",
        estado: "SC",
        cep: "89300-000"
    },
    {
        nome: "Mateus",
        email: "mateus@email.com",
        telefone: "(47) 9 8777-3320",
        numero_documento: "18.843.707/0001-25",
        tipo_pessoa: "PJ",
        rua: "R. Duque de Caxias",
        numero: 850,
        cidade: "Timbó",
        estado: "SC",
        cep: "89281-000"
    }
];

insereClientes(clientes);