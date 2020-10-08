
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
//const BalanceSummaryController = require('./controllers/BalanceSummaryController')
const NewAccountController = require('./controllers/NewAccountController')
//const HistoriesController = require('./controllers/HistoriesController')

//const isAuthenticated = require('./policies/isAuthenticated')


module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    
        app.post('/login',
            AuthenticationController.login)
        
        app.post('/newaccount',
            NewAccountController.post)
}