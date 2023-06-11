module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  
  // this middleware checks if we are logged in, if not it will send us back to home page, this allows us to secure our todos pages so that no one can bypass the sign in wall.
  //ensureAuth is used in our todos.js file inside our routes.