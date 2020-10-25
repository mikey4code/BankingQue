const {Transac,Account} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      console.log('here ', req.query)
      console.log('here ', req.body)
      const where = {
        UserId: 1
      }
      const transacs = await Transac.findAll({
        where: where,
        include: [{
          model: Account
        }]
      })
      const newtran = transacs.map(tran => tran.toJSON()).map(tran => _.extend({tranId: tran.id}, tran.Account))
      res.send(newtran)
    }catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the Transaction'
      })
    }
  },
  async post (req, res) {
    try {    
    console.log(req.body)
    const newtran = await Transac.create(req.body)
    res.send(newtran)
    }catch (err) {
  res.status(500).send({
    error: 'an error has occured trying to create transaction'
    })
  }
 }
}