module.exports = (sequelize, DataTypes) => {
    const Transac = sequelize.define('Transac', {

        trans: DataTypes.STRING
    })
  
    Transac.associate = function (models) {

        Transac.belongsTo(models.User)
        Transac.belongsTo(models.Account)
    }

    return Transac
  }