const express = require('express')
const morgan = require('morgan')
const ehbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT

// view engine set up
app.set('views', './views')
app.set('view engine', 'hbs')
require('express-handlebars-sections')(ehbs)
app.engine('.hbs', ehbs.engine({
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan("dev"))

app.get('/', (req, res) => {
  res.render('home', {layout: false});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})