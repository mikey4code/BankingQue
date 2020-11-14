const {Transfer} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const transfer = await Transfer.findAll({
        limit: 10
      })
      console.log('this', transfer)
      res.send(transfer)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch credit'
      })
    }
  },
  async showtransfer (req, res) {
    try {
      const reqnumber = req.query.param
      console.log('what is req ', reqnumber)
      console.log('need to be here ')
      const tran = await Transfer.findAll({
        where: {
          accnumber: reqnumber
        }
      })
      console.log('this trnasfer', tran)
      res.send(tran)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch account accnumber'
      })
    }
  },
  async show (req, res) {
    try {
      const reqnumber = req.query.accnumber
      console.log('what is req ', reqnumber)
      const account = await Transfer.findOne({
        order:[
          ['id', 'DESC']
        ]
      })
      console.log('this', account)
      res.send(account)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch credit that is recently added'
      })
    }
  },
  async post (req, res) {
        try {
          console.log('checking...', req.body)
          const transfer = await Transfer.create(req.body)
          res.send(transfer)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create credit'
          })
        }
      }
}
