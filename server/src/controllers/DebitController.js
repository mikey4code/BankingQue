const {Debit} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const debit = await Debit.findAll({
        limit: 10
      })
      console.log('this', debit)
      res.send(debit)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch debit'
      })
    }
  },
  async showdebit (req, res) {
    try {
      const reqnumber = req.query.param
      console.log('what is req ', reqnumber)
      console.log('need to be here ')
      const tran = await Debit.findAll({
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
  async show (req, res) {
    try {
      const reqnumber = req.query.accnumber
      console.log('what is req ', reqnumber)
      const account = await Debit.findOne({
        order:[
          ['id', 'DESC']
        ]
      })
      console.log('this', account)
      res.send(account)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch debit that is recently added'
      })
    }
  },
  async post (req, res) {
        try {
          console.log('what debit ', req.body)
          const debit = await Debit.create(req.body)
          res.send(debit)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create debit'
          })
        }
      }
}
