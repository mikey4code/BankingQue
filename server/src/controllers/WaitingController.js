const {Waiting} = require('../models')
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: '3defaf8a',
  apiSecret: 'D8TEiCyv8cxtRcCA',
})

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
      const account = await Waiting.findOne({
        order:[
          ['id', 'ASC']
        ]
      })
      await Waiting.destroy({
        where: {
          id: account.id
        }
      });
      res.send(account)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete waiting queue'
      })
    }
  },
  async sendtext (req, res) {
    try {
      const account = await Waiting.findOne({
        order:[
          ['id', 'ASC']
        ]
      })
      console.log('info', account)
      const from = '15417038583';
      const to = '1' + account.phone;
      const text = 'Hello, We are ready to take you in.';
      nexmo.message.sendSms(from, to, text)
      res.send(account)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to SEND TEXT'
      })
    }
  },
  async exitqueue (req, res) {
    try {
      console.log('in here', req.query.UserId)
      const account = await Waiting.findOne({
        where: {
          UserId: req.query.UserId
        }
      })
      await Waiting.destroy({
        where: {
          id: account.id
        }
      });
      console.log('res', res)
      res.send(account)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete waiting queue'
      })
    }
  }
}
