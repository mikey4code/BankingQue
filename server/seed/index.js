const {
    sequelize,
    Account,
    User,
    Transac,
    Transaction
  } = require('../src/models')
  
  const Promise = require('bluebird')
  const accounts = require('./accounts.json')
  const users = require('./users.json')
  const transacs = require('./transacs.json')
  const transactions = require('./transactions.json')
 
  
  sequelize.sync({force: true})
    .then(async function () {
      await Promise.all(
        users.map(user => {
          User.create(user)
        })
      )
  
      await Promise.all(
        accounts.map(account => {
          Account.create(account)
        })
      )
      
      await Promise.all(
        transactions.map(transaction => {
          Transaction.create(transaction)
        })
      )

      await Promise.all(
        transacs.map(transac => {
          Transac.create(transac)
        })
      )
    })