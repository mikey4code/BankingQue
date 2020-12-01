const {Account} = require('../models')

module.exports = {
    // RETURN ALL ACCOUNTS
    async index (req, res) {
        try {
          const account = await Account.findAll()
          console.log('this', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account'
          })
        }
      },
      
      // RUTURN ONE ACCOUNT BY ACCT NUMBER
      async show (req, res) {
        try {
          const reqnumber = req.query.accnumber
          console.log('what is req here ', reqnumber)
          const account = await Account.findOne({
            where: {
              accnumber: reqnumber
            }
          })
          console.log('this', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account by accnumber'
          })
        }
      },

      // AUTO FILL INFO BY ACCT NUMBER WITH AMOUNT
      async autofill (req, res) {
        try {
          const reqnumber = req.query.accnumber
          console.log('what is req here ', reqnumber)
          const account = await Account.findOne({
            where: {
              accnumber: reqnumber
            }
          })
          console.log(account.accnumber)
          console.log(account.toJSON())
          var obj = account.toJSON()
          delete obj.amount
          console.log(obj)
          // console.log('this', newacc)
          res.send(obj)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to autofill account by accnumber'
          })
        }
      },

      // RETURN ALL ACCOUNT BY USER ID 
      async useracc (req, res) {
        try {
          const userId = req.query
          console.log('what is req here ', userId)
          const account = await Account.findAll({
            where: {
              UserId: userId.UserId
            }
          })
          console.log('this', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account by User Id'
          })
        }
      },

      // RETURN ONE ACCOUNT BY ACCT ID
      async showacc (req, res) {
        try {
          console.log('acount id ', req.params.accountId)
          const account = await Account.findOne({
            where: {
              id: req.params.accountId
            }})
          console.log('account byID', account)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch account by ID'
          })
        }
      },

      // CREATE ACCOUNT
      async post (req, res) {
        try {
          console.log('details here ',req.body)
          console.log('details and now',req.body.accnumber)
          const account = await Account.create(req.body)
          res.send(account)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to create account'
          })
        }
      },

      // UPDATE ACCOUNT INFO, FIND BY ACCOUNT ID
      async put (req, res) {
        try {
          console.log('details here ',req.body)
          console.log('details and now',req.body.accnumber)
          const account = await Account.update(req.body , {
            where: {
              id: req.params.accountId
            }
          })
          console.log(account)
          res.send(req.body)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to update account'
          })
        }
      },

      // UPDATE ACCOUNT AMOUNT
      async useramount (req, res) {
        try {
          const param = req.body.params
          console.log('details here ',req.body.params)
          const account = await Account.findOne({
            where: {
              accnumber: param.accnumber
            }
          })
          console.log('the acct to update', account)
          console.log('the acct to update trantype', account.trantype)
          if (param.trantype === "Deposit") {
            account.amount += param.amount
          } else {
            account.amount -= param.amount
          }
          await account.save()
          console.log('updated acct', account)
          res.send(req.body)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to update account'
          })
        }
      }   
}
