const express = require("express");
const morgan = require("morgan");

const app = express();

// Importando as rotas
const usuariosRoutes = require("./routes/usuariosRoutes");

// Definindo a porta
const porta = 3000;

// Definindo os middlewares
app.use(express.json());
app.use(morgan("dev"));

// Definindo as rotas
app.use("/usuarios", usuariosRoutes);

// Definindo o middleware de tratamento de erros
app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({ message: error.message });
});

// Iniciando o servidor
app.listen(porta, () => {
    console.log(`O servidor está rodando na porta: ${porta}`);
});