const {Transaction} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const transaction = await Transaction.findAll()
      console.log('this', transaction)
      res.send(transaction)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch transaction'
      })
    }
  },
  async show (req, res) {
    try {
      const account = await Transaction.findOne({
        order:[
          ['id', 'DESC']
        ]
      })
      console.log('this', account)
      res.send(account)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch account that is recently added'
      })
    }
  },
  async showtran (req, res) {
    try {
      const reqnumber = req.query.param
      console.log('what is req ', reqnumber)
      console.log('need to be here ')
      const tran = await Transaction.findAll({
        where: {
          accnumber: reqnumber
        }
      })
      console.log('this', tran)
      res.send(tran)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch account accnumber'
      })
    }
  },
  async post (req, res) {
        try {
          console.log('req body', req.body)
          const transaction = await Transaction.create(req.body)
          console.log('sever', transaction)
          res.send(transaction)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create transaction'
          })
        }
      }
}
