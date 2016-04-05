var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var app           = express();
var mongoose      = require('mongoose');
var User          = require('./models/user');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/authentication-practise')

app.post("/signup", function(req, res){
  var userObject = new User(req.body.user)
  userObject.save(function(err, user){
    if(err) return res.status(401).send({message: error.errmsg})
    res.status(200).send({message: "user created"})
  })
})

app.post("/signin", function(req, res) {
  var userParams = req.body.user
  User.findOne({ email: userParams.email }, function(err, user) {
    // check input password with hash
    user.authenticate(userParams.password, function(err, isMatch) {
      if (err) throw err
      if (isMatch) {
        return res.status(200).send({ message: "valid credentials" })
      }
      res.status(401).send({ message: "You suck" })
    })
  })
})

// Only render errors in development
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000)
