const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

// Lendo as informações de um arquivo (Callback)
fs.readFile(path.resolve(__dirname, "teste.txt"), (err, data) => {
    if (err) {
        return console.log(err.message);
    }

    // data é um Buffer: https://nodejs.org/docs/latest-v14.x/api/buffer.html#buffer_class_buffer
    // Portanto precisamos converter para utf-8 para conseguirmos visualizar o conteúdo do arquivo.
    console.log(data.toString("utf-8"));
});

// Lendo as informações de um arquivo (Promise)
(async () => {
    try {
        const data = await fsPromises.readFile(path.resolve(__dirname, "teste.txt"));

        console.log(data.toString("utf-8"))
    } catch (err) {
        console.log(err.message);
    }
})();