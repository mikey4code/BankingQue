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
