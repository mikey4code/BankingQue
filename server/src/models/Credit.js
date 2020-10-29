module.exports = (sequelize, DataTypes) => {
  const Credit = sequelize.define('Credit', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    license: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    income: DataTypes.INTEGER,
    accnumber: DataTypes.INTEGER,
  })
  return Credit
}