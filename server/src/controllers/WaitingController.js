const {Waiting} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const wait = await Waiting.findAll({
        limit: 10
      })
      console.log('this', wait)
      res.send(wait)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch waitng queue'
      })
    }
  },
  async post (req, res) {
        try {
          console.log('checking...', req.body)
          const wait = await Waiting.create(req.body)
          res.send(wait)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create waiting queue'
          })
        }
      },
  async removeq (req, res) {
        try {
          console.log('in here')
          await Waiting.destory({
            where: {
            id: 1
          }})
          console.log('AM I HERE')
          res.send()
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to delete waiting queue'
          })
        }
      }
}
