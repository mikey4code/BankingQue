const {
    sequelize,
    Account,
    User,
    Transac
  } = require('../src/models')
  
  const Promise = require('bluebird')
  const accounts = require('./accounts.json')
  const users = require('./users.json')
  const transacs = require('./transacs.json')
 
  
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
        transacs.map(transac => {
          Transac.create(transac)
        })
      )
    })