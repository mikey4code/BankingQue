
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const NewAccountController = require('./controllers/NewAccountController')
const TransacHisController = require('./controllers/TransacHisController')
const TransactionController = require('./controllers/TransactionController')
const DebitController = require('./controllers/DebitController')
const CreditController = require('./controllers/CreditController')
const TransferController = require('./controllers/TransferController')
const WaitingController = require('./controllers/WaitingController')

const isAuthenticated = require('./policies/isAuthenticated')
const isrootAuthenticated = require('./policies/isrootAuthenticated')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    
        app.post('/login',
            AuthenticationController.login)
        
        app.get('/accountreport',
            isrootAuthenticated,
            NewAccountController.index)

        app.get('/useracc/:accountId',
            isAuthenticated,
            NewAccountController.showacc)

        app.put('/useracc/:accountId',
            isAuthenticated,
            NewAccountController.put)

        app.put('/useramount',
            isAuthenticated,
            NewAccountController.useramount)
            
        app.get('/useracc',
            isAuthenticated,
            NewAccountController.useracc)
            
        app.post('/newaccount',
            NewAccountController.post)
    
        app.get('/showaccount',
            NewAccountController.show)

        app.get('/autofill',
            NewAccountController.autofill)

        app.get('/viewtrans',
            isrootAuthenticated,
            TransacHisController.index)

        app.post('/viewtrans',
            TransacHisController.post)

        app.post('/transaction',
            TransactionController.post)
            
        app.get('/transactionreport',
            isrootAuthenticated,
            TransactionController.index)

        app.get('/showtransaction',
            TransactionController.show)
            
        app.get('/showtran',
            TransactionController.showtran)

        app.post('/debit',
            DebitController.post)
        
        app.get('/debitreport',
            isrootAuthenticated,
            DebitController.index)

        app.get('/showdebit',
            DebitController.showdebit)

        app.get('/recentdebit',
            DebitController.show)

        app.post('/credit',
            CreditController.post)

        app.get('/creditreport',
            isrootAuthenticated,
            CreditController.index)

        app.get('/recentcredit',
            CreditController.show)

        app.get('/showcredit',
            CreditController.showcredit)
       
        app.post('/transfer',
            TransferController.post)

        app.get('/showtransfer',
            TransferController.showtransfer)

        app.get('/recenttransfer',
            TransferController.show)

        app.get('/transferreport',
            isrootAuthenticated,
            TransferController.index)

        app.post('/waitingqueue',
            WaitingController.post)

        app.get('/waitingqueue',
            WaitingController.index)

        app.delete('/removequeue',
            WaitingController.removeq)

        app.delete('/exitqueue',
            WaitingController.exitqueue)

        app.post('/sendtext',
            WaitingController.sendtext)

}
