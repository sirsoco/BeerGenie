

module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    beerName: {type: DataTypes.STRING,
    allowNull: false},
    beerData: {
      type: DataTypes.JSON,
      allowNull: false},
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: {
          min: 0,
          max:5
      },
      UserId: {type: DataTypes.STRING,
    allowNull: false},
  }
  });
  Favorite.associate = function (models) {

    Favorite.belongsTo(models.User, {
      foreignKey: {

        allowNull: false
      }
    })
  }
  return Favorite;
}

