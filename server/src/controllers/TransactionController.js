const {Transaction, Account} = require('../models')

module.exports = {
    async index (req, res) {
      try {
        const userId = req.user.id
        const {songId} = req.query
        const where = {
          UserId: userId
        }
        if (songId) {
          where.SongId = songId
        }
        const transaction = await Transaction.findAll({
          where: where,
          include: [
            {
              model: Account
            }
          ]
        })
        res.send(transaction)
      }catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the bookmark'
    })
  }
  }

}