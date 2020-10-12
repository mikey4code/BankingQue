const {Transac} = require('../models')

module.exports = {
    async index (req, res) {
      try {
        //const {accountId, userId} = req.query
        const accountId = req.query.AccountId
        // const userId = req.query
        console.log("account",accountId)
        
        const transac = await Transac.findOne({
          where: {
          AccountId: accountId
        }
      })
      console.log("here", transac)
      res.send(transac)
      }catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the transaction'
      })
    }
  },
  async post (req, res) {
    try {
      //const {accountId, userId} = req.query
      const accountId = req.query.AccountId
      // const userId = req.query
      console.log("account",accountId)
      
      const transac = await Transac.findOne({
        where: {
        AccountId: accountId
      }
    })
    console.log("here", transac)
    res.send(transac)
    }catch (err) {
  res.status(500).send({
    error: 'an error has occured trying to fetch the transaction'
    })
  }
}

}