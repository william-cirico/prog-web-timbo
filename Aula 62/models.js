// Models são uma abstração que representam as tabelas do banco de dados.
// Podem ser definidos através da função sequelize.define() ou através da herança da classe Model
const { DataTypes, Model, Sequelize } = require("sequelize");
const { hashSync } = require("bcrypt");
const sequelize = require("./conectando");


// sequelize.define(nomeDoModel, {atributos}, opções):
const Cliente = sequelize.define("Cliente", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue("senha", hashSync(value, 10));
        }
    },
    pontos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: "clientes",
    underscored: true
});

// Extendendo a classe Model
class Endereco extends Model {}
Endereco.init({
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.CHAR(2),
        validate: {
            isIn: {
                args: [["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
                    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
                    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ]],
                msg: "Precisa ser uma sigla de estado válida"
            }
        }        
    }
}, {
    sequelize,
    timestamps: false,  // removendo os campos createdAt, updatedAt
    // modelName: "Endereco",
    tableName: "enderecos",
    underscored: true
});

// 1..1
Cliente.hasOne(Endereco, {
    foreignKey: {
        type: DataTypes.UUID
    },
    onDelete: "CASCADE",
});

Endereco.belongsTo(Cliente);

// 1..N
class Jogador extends Model {}
Jogador.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    sequelize,
    tableName: "jogadores",
    underscored: true
});

class Time extends Model {}
Time.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "times",
    underscored: true
});

Time.hasMany(Jogador);
Jogador.belongsTo(Time);

// N..N
class Filme extends Model {}
Filme.init({ nome: DataTypes.STRING }, { sequelize, tableName: "filmes" });

class Ator extends Model {}
Ator.init({ nome: DataTypes.STRING }, { sequelize, tableName: "atores", });

Filme.belongsToMany(Ator, { 
    through: "filme_ator", 
    as: "ator" 
});
Ator.belongsToMany(Filme, { through: "filme_ator" });

// (async () => {
//     try {  
//         // Deletando as tabelas
//         await sequelize.drop();
//         console.log("Tabelas deletadas");    
    
//         // Criando as tabelas
//         await sequelize.sync({ force: true });
//         console.log("Tabelas criadas");

//         // Inserindo registro
//         const mateus = await Jogador.create({
//             nome: "Mateus",
//             email: "mateus@email.com"
//         });        

//         await mateus.createTime({ nome: "Time 01" });
//         console.log((await mateus.getTime()).toJSON());

//         // Ou

//         await Jogador.create({
//             nome: "Josué",
//             email: "josue@email.com",
//             TimeId: 1
//         }); 
        
//         // Inserindo registro N..N
//         const titanic = await Filme.create({ nome: "Titanic" });
//         const leonardo = await Ator.create({nome: "Leonardo DiCaprio"});        
//         await titanic.setAtor([leonardo]);
//         await titanic.createAtor({nome: "Kate Winslet"});
//     } catch (error) {
//         console.log(error.message);
//     } finally {
//         sequelize.close();
//     }    
// })();

module.exports = {
    Cliente,
    Endereco
};