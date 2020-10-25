const {Account} = require('../models')

module.exports = {
    async index (req, res) {
        try {
          const account = await Account.findAll({
            limit: 10
          })
          console.log('this', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account'
          })
        }
      },
      async post (req, res) {
        try {
          const account = await Account.create(req.body)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create account'
          })
        }
      }   
}
