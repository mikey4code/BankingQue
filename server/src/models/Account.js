module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    trantype: DataTypes.STRING,
    firstn: DataTypes.STRING,
    lastn: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    dob: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    accnumber: DataTypes.INTEGER,
  })
  
  Account.associate = function (models) {

    Account.belongsTo(models.User)
    
  }
  return Account
}