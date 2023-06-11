// express is a framework used instead of vanilla node.js
const express = require('express')
const app = express()
// mongoose just like mongoDB is used for the database
const mongoose = require('mongoose')
// passport.js is used for the authentication
const passport = require('passport')
// session and mongoStore helps us set up our session.
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)
// the line below connect to the Database
connectDB()
// connectDB() get us to connect to the database, now mongoose knows how to keep us connecting in every other single file by just requiring mongoose.
// we connect once to our database in server.js and therefore we get to be connected in every other file by just requiring mongoose.



// we're using ejs for our views
app.set('view engine', 'ejs')
// express get automatically the files requested from the public folder
app.use(express.static('public'))
// the next two lines helps us get the request we want and pull all the stuff coming from the forms request.
// these lines let us take a peek at the request coming through, we can grab every single part of the request made to the server, so we can make any type of request, we can make a get/ post / put request whatever we're making a request. these part let us look at different parts of the request that are coming through.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// the line below is just setting up morgan to log and run everything
app.use(logger('dev'))
// Sessions
// (here we set up our session)
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      // store let us know that we are going to store our session in mongoDB
    })
  )
  
// Passport middleware |(these line let us know that we are using passport for authentication and in our session as well)
app.use(passport.initialize())
app.use(passport.session())
// these are the flash alert that works when something isn't working well with our log ins
app.use(flash())
// those are our routes set up so our app knows how to handle those request when they're coming in. any of the request on the route routes goes to mainRoutes, any request on the todos goes to the todoRoute.
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
// then we kick off our server, we use process.env.PORT so that in case we push to heroku the app finds a route to connect to.
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    