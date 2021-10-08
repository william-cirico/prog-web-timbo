const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/usersRoutes"));

app.use(require("./middlewares/errorHandlerMiddleware"));

module.exports = app;