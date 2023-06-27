require('dotenv').config()

const express = require('express')
const app = express()
const methodOverride = require('method-override')
const port = 3000
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const indexRouter = require('./routes/index')
const cosplaysRouter = require('./routes/cosplay')

app.set('view engine', 'ejs')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

  app.use('/', indexRouter)
  app.use('/cosplays', cosplaysRouter)



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})