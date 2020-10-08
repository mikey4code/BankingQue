module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {})
  
  Transaction.assoicate = function (models){
    
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Account)

  }
  
  return Transaction
}