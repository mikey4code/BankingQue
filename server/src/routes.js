
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const NewAccountController = require('./controllers/NewAccountController')
const TransacHisController = require('./controllers/TransacHisController')
const TransactionController = require('./controllers/TransactionController')
const DebitController = require('./controllers/DebitController')
const CreditController = require('./controllers/CreditController')
const TransferController = require('./controllers/TransferController')
const WaitingController = require('./controllers/WaitingController')


//const isAuthenticated = require('./policies/isAuthenticated')


module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    
        app.post('/login',
            AuthenticationController.login)
        
        app.get('/accountreport',
            NewAccountController.index)

        app.get('/useracc/:accountId',
            NewAccountController.showacc)
            
        app.get('/useracc',
            NewAccountController.useracc)
            
        app.post('/newaccount',
            NewAccountController.post)
    
        app.get('/showaccount',
            NewAccountController.show)

        app.get('/viewtrans',
            TransacHisController.index)

        app.post('/viewtrans',
            TransacHisController.post)

        app.post('/transaction',
            TransactionController.post)
            
        app.get('/transactionreport',
            TransactionController.index)

        app.get('/showtransaction',
            TransactionController.show)

        app.post('/debit',
            DebitController.post)
        
        app.get('/debitreport',
            DebitController.index)

        app.post('/credit',
            CreditController.post)

        app.get('/creditreport',
            CreditController.index)
       
        app.post('/transfer',
            TransferController.post)

        app.get('/transferreport',
            TransferController.index)

        app.post('/waitingqueue',
            WaitingController.post)

        app.get('/waitingqueue',
            WaitingController.index)

        app.delete('/removequeue',
            WaitingController.removeq)
}
