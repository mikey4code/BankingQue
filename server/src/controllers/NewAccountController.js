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
      async show (req, res) {
        try {
          const reqnumber = req.query.accnumber
          console.log('what is req here ', reqnumber)
          const account = await Account.findOne({
            where: {
              accnumber: reqnumber
            }
          })
          console.log('this', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account by accnumber'
          })
        }
      },
      async useracc (req, res) {
        try {
          const userId = req.query
          console.log('what is req here ', userId)
          const account = await Account.findAll({
            where: {
              UserId: userId.UserId
            }
          })
          console.log('this', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account by User Id'
          })
        }
      },
      async showacc (req, res) {
        try {
          console.log('acount id ', req.params.accountId)
          const account = await Account.findOne({
            where: {
              id: req.params.accountId
            }})
          console.log('account byID', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account by ID'
          })
        }
      },
      async post (req, res) {
        try {
          console.log('details here ',req.body)
          console.log('details and now',req.body.accnumber)
          const account = await Account.create(req.body)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create account'
          })
        }
      }   
}
