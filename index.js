const express = require('express');
const morgan = require('morgan');
const handlebars = require("./utils/handlebars");
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const db = require('./models');
const routes = require("./routes");

const app = express();

// view engine set up
app.set('views', path.join(__dirname, 'views'));
handlebars(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home', {
    title: "Trang chủ",
    layout: 'general',
  });
})

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})