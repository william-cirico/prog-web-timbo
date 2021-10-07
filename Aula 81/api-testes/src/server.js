const app = require("./app");
const PORT = process.env.PORT || 3001;

app.listen(3000, () => console.log(`Server is running at: ${PORT}`));