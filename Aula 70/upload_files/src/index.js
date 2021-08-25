require("dotenv").config();

const express = require("express");
const path = require("path");
const fsp = require("fs/promises");
const multer = require("multer");
const multerConfig = require("./config/multer");
const { User } = require("./models");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use("/images", express.static("uploads"));

app.post("/users", 
    multer(multerConfig).single("avatar"), 
    async (req, res) => {
        const { name, email, password } = req.body;
        const file = req.file;

        const avatar = `${process.env.APP_URL}/images/${file.filename}`;

        try {
            const [ user, created ] = await User.findOrCreate({
                where: { email },
                defaults: {
                    name,
                    password,
                    avatar                    
                }
            });
        
            if (!created) {
                // Remover a imagem
                await fsp.unlink(path.resolve(__dirname, "..", "uploads", file.filename));

                return res.status(409).json({ message: "User already exists" });                
            }
            
            res.json(user);          
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }     
    }
);

app.listen(3000, () => console.log("Server Up!"));