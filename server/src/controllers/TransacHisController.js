const {Transac} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      console.log('here this ', req.query)

      const transacs = await Transac.findAll({ include: { all: true }});

      console.log(transacs)
      const newtran = transacs.map(tran => tran.toJSON()).map(tran => _.extend({tranId: tran.id}, tran.Account, tran.Transaction, tran.Transfer, tran.Credit, tran.Debit))
      res.send(newtran)
    }catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the Transaction'
      })
    }
  },
  async post (req, res) {
    try {    
    console.log('this is what', req.body)
    const newtran = await Transac.create(req.body)
    res.send(newtran)
    }catch (err) {
  res.status(500).send({
    error: 'an error has occured trying to create transaction'
    })
  }
 }
}