require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

const erroHandler = require("./middlewares/errorHandler");


app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(erroHandler);

app.listen(3000, () => {
    console.log("Servidor iniciou!");
});