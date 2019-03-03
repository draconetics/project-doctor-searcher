const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');


// connection to db
mongoose.connect('mongodb://localhost/doctorFinder',  { useNewUrlParser: true })
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));


app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const indexDoctor = require('./routes/doctor');
app.use('/doctor', indexDoctor);

app.listen(app.get('port'),()=>{
	console.log("server running on port " + app.get('port'));
});