

module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    beer_id: DataTypes.STRING,
    user_id: DataTypes.STRING 
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

