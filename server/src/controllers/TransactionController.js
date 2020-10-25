const {Transaction} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const transaction = await Transaction.findAll({
        limit: 10
      })
      console.log('this', transaction)
      res.send(transaction)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch account'
      })
    }
  },
  async post (req, res) {
        try {
          const transaction = await Transaction.create(req.body)
          res.send(transaction)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create transaction'
          })
        }
      }
}
