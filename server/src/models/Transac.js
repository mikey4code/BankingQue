module.exports = (sequelize) => {
    const Transac = sequelize.define('Transac', {})
  
    Transac.associate = function (models) {

        Transac.belongsTo(models.User)
        Transac.belongsTo(models.Account)
        Transac.belongsTo(models.Transaction)
        Transac.belongsTo(models.Credit)
        Transac.belongsTo(models.Debit)
        Transac.belongsTo(models.Transfer)
        
    }

    return Transac
  }