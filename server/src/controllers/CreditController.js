const {Credit} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const credit = await Credit.findAll({
        limit: 10
      })
      console.log('this is credit ', credit)
      res.send(credit)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch credit'
      })
    }
  },
  async showcredit (req, res) {
    try {
      const reqnumber = req.query.param
      console.log('what is req ', reqnumber)
      console.log('need to be here ')
      const tran = await Credit.findAll({
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
      const account = await Credit.findOne({
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
          const credit = await Credit.create(req.body)
          res.send(credit)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create credit'
          })
        }
      }
}
