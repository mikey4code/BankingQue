module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define('Transfer', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    accnumber: DataTypes.INTEGER,
    recipn: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  })
  return Transfer
}