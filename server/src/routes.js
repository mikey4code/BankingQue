
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
//const BalanceSummaryController = require('./controllers/BalanceSummaryController')
const NewAccountController = require('./controllers/NewAccountController')
const TransacHisController = require('./controllers/TransacHisController')
const TransactionController = require('./controllers/TransactionController')

//const isAuthenticated = require('./policies/isAuthenticated')


module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    
        app.post('/login',
            AuthenticationController.login)
        
        app.get('/accountreport',
            NewAccountController.index)
            
        app.post('/newaccount',
            NewAccountController.post)

        app.get('/viewtrans',
            TransacHisController.index)

        app.post('/viewtrans',
            TransacHisController.post)

        app.post('/transaction',
            TransactionController.post)
            
        app.get('/transactionreport',
            TransactionController.index)
       
}
