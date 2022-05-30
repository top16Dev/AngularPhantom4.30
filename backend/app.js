const express = require('express');
const mongoose = require('mongoose');
const expresshbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load Routes
const indexRouter = require('./routes/index');
const product = require('./routes/api/product');
const users = require('./routes/api/users');
const customer = require('./routes/api/customer');
const order = require('./routes/api/order');
const country = require('./routes/api/country');

const app = express();
// view engine setup
app.engine('.hbs',expresshbs({defaultLayout: 'layout', extname: '.hbs'}));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
// Set public folder
app.use(express.static(path.join(__dirname, '/public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// DB Config
//const db = config.get('mongoURI');
const db = require('./config/key').mongoURI;
// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Enable CORS
app.use(cors());

// Use Routes
app.use('/', indexRouter);
app.use('/api/users', users);
app.use('/api/product', product);
app.use('/api/customer', customer);
app.use('/api/order', order);
app.use('/api/country', country);


const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
