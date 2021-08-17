const { Model, DataTypes } = require("sequelize");

class Endereco extends Model {
    static init(sequelize) {
        super.init({
            rua: {
                type: DataTypes.STRING,
                allowNull: false
            },
            numero: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0
                }
            }
        }, {
            sequelize      
        });
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { 
            foreignKey: {
                name: "usuarioId",
                type: DataTypes.UUID,
                allowNull: false
            }
        });
    }
}

module.exports = Endereco;