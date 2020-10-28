module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    phone: DataTypes.STRING,
    accnumber: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  })
  Transaction.associate = function (models) {

    Transaction.belongsTo(models.Account)
}

  return Transaction
}