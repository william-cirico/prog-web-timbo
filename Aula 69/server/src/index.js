require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

const errorMiddleware = require("./middlewares/error");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(errorMiddleware);


app.listen(PORT, () => console.log("Servidor está rodando na porta: " + PORT));