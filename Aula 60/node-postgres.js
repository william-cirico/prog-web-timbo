const { Pool } = require("pg");
const format = require("pg-format");
// Instância de conexão com o banco de dados
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "123456",
    database: "node"
});

(async () => {        
    // Executando uma query sem parâmetros
    try {                
        const res = await pool.query('SELECT NOW()');
        console.log(res.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
    
    // Criando tabelas
    try {        
        await pool.query(`
        CREATE TABLE IF NOT EXISTS funcionarios (
            id SERIAL PRIMARY KEY,
            nome text NOT NULL,
            telefone text NOT NULL            
        );
        
        CREATE TABLE IF NOT EXISTS enderecos (
            id SERIAL PRIMARY KEY,
            rua text NOT NULL,
            numero integer NOT NULL,
            cidade text NOT NULL,
            estado text NOT NULL,
            id_funcionario integer REFERENCES funcionarios        
        );`);
        console.log("Tabelas criadas");
    } catch (err) {
        console.log(err.message);
    }

    // Inserindo um registro (Query com parâmetros)
    try {
        const query = "INSERT INTO funcionarios (nome, telefone) VALUES ($1, $2) RETURNING *";
        const funcionario = ["Josué", "(47) 9 2222-2222"];                

        const { rows } = await pool.query(query, funcionario);
        console.log("Registro de funcionário criado!");
        console.log(rows);        
    } catch (err) {
        console.log(err.message);
    }

    // Inserindo registros
    try {
        const funcionarios = [
            ["Pedro", "(47) 9 8888-8888"],
            ["José", "(47) 9 7777-7777"]
        ];

        const query = format("INSERT INTO funcionarios (nome, telefone) VALUES %L RETURNING *", funcionarios);

        const { rows } = await pool.query(query);
        console.log("Registros de funcionários inseridos!");
        console.log(rows);        
    } catch (err) {
        console.log(err.message);
    }

    // Obtendo registros
    try {
        const { rows } = await pool.query(`SELECT telefone FROM funcionarios WHERE nome = $1;`, ["Pedro"]);        
        console.log(`O telefone do Pedro é: ${rows[0].telefone}`);
    } catch (err) {
        console.log(err.message);
    }

    await pool.end();
    console.log("Conexão finalizada!");
})();

