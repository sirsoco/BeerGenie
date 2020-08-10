

module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    beerName: DataTypes.STRING,
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: {
          min: 0,
          max:5
      }
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

