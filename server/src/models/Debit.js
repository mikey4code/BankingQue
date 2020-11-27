module.exports = (sequelize, DataTypes) => {
  const Debit = sequelize.define('Debit', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    license: DataTypes.INTEGER,
    accnumber: DataTypes.INTEGER,
  })
  return Debit
}