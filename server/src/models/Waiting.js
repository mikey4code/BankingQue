module.exports = (sequelize, DataTypes) => {
  const Waiting = sequelize.define('Waiting', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    phone: DataTypes.STRING,
    accnumber: DataTypes.INTEGER,
  })

  return Waiting
}