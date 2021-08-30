require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de requisição
app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads'));

// Adicionando as rotas no servidor
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

// Middlewares de resposta
app.use(errorHandlerMiddleware);

app.listen(PORT, console.log("Server is running..."));