module.exports = (sequelize) => {
    const Transac = sequelize.define('Transac', {})
  
    Transac.associate = function (models) {

        Transac.belongsTo(models.User)
        Transac.belongsTo(models.Account)
        Transac.belongsTo(models.Transaction)
        
    }

    return Transac
  }