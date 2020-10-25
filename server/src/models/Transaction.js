module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    phone: DataTypes.STRING,
    amount: DataTypes.INTEGER
  })

  return Transaction
}