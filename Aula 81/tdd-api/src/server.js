const app = require("./app");
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("O servidor está rodando..."));