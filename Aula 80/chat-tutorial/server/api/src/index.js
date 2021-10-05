require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de request
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Definindo as rotas
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chats", require("./routes/chatsRoutes"));
app.use("/api/messages", require("./routes/messagesRoutes"));

// Definindo o middleware de tratamento de erros
app.use(require("./middlewares/errorHandlerMiddleware"));


app.listen(PORT, () => console.log("O servidor está rodando na porta: " + PORT))