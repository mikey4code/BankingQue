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
