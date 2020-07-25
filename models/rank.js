module.exports = function(sequelize, DataTypes) {
    var Rank = sequelize.define('Rank', {
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max:5
            }
        }
    });
    Rank.associate = function (models) {
    Rank.belongsTo(models.User, {
        foreignKey: {

            allowNull: true
        }
    })
}
    return Rank; 
}
