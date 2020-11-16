const passport = require('passport')

module.exports = function (req, res, next) {
    passport.authenticate('jwt', function rootAuth (err, user) {
      console.log('whos is this user', user.email)
      if (err || (user.email != 'root@gmail.com')) {
        res.status(403).send({
          error: 'you do not have access to this resource, only root user'
        })
      } else {
        req.user = user
        next()
      }
    })(req, res, next)
  }