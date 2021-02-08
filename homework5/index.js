const express = require('express');
const passport = require('passport');
const strategy = require('./handlers');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./db_connection');

const port = 8080;
const app = express();

passport.use('local', strategy.localStrategy);
passport.use('bearer', strategy.bearerStrategy);

passport.serializeUser((user, done) => {
   let token = jwt.sign(
    { username: user.username },
   'uuiiiiui',
    { expiresIn: '6h' },
  );
  db.Visitor.updateOne({username: user.username}, {jwtoken: token}, (err, updatedUser) => {
    done(null, updatedUser);
    console.log(token);
  })
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/token',
  passport.authenticate('local'),
  (req, res) => {
    console.log(req.body);
    res.send(`Hi, ${req.body.username}! You login successfully`)
});

app.get('/', 
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    console.log(`Hi! Your token is fine`)
  }
);

app.listen(port, async () => {
  console.log('Server listening on 8080 port');
  const visitors = await db.Visitor.find({});
  console.log("Visitors: ", visitors);
});
