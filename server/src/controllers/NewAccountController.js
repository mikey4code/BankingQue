const {Account} = require('../models')

module.exports = {
    async post (req, res) {
        try {
          const account = await Account.create(req.body)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create account'
          })
        }
      }
}
