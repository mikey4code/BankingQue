module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    dob: DataTypes.STRING,
    amount: DataTypes.INTEGER
  })

  return Account
}