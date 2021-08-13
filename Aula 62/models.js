// Models são uma abstração que representam as tabelas do banco de dados.
// Podem ser definidos através da função sequelize.define() ou através da herança da classe Model
const { DataTypes, Model, Sequelize } = require("sequelize");
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
        type: DataTypes.INTEGER,
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

Cliente.hasOne(Endereco, {
    foreignKey: {
        type: DataTypes.UUID
    },
    onDelete: "CASCADE"
});
Endereco.belongsTo(Cliente);

(async () => {
    try {
        // Criando as tabelas
        await sequelize.sync({ force: true });
        console.log("Tabelas criadas");
        
        // Deletando as tabelas
        // await sequelize.drop();
        // console.log("Tabelas deletadas");
    } catch (error) {
        console.log(error.message);
    } finally {
        sequelize.close();
    }    
})();

module.exports = {
    Cliente,
    Endereco
};