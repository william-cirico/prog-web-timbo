const { Model, DataTypes } = require("sequelize");

class Projeto extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            quantidadeHoras: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.belongsToMany(models.Usuario, 
            { 
                through: "UsuariosProjetos", 
                as: {
                    singular: "usuario",
                    plural: "usuarios"
                }
            }
        );
    }
}

module.exports = Projeto;