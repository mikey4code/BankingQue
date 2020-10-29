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
