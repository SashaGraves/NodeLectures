const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const db = require('./db_connection');

const localStrategy = new LocalStrategy((username, password, done) => {
  db.Visitor.findOne({username, password})
  .exec()
  .then((foundVisitor) => {
    if (!foundVisitor) { 
      console.log('No user found');
      return done(null, false); 
    }
    console.log(foundVisitor);
    return done(null, foundVisitor);
  })
  .catch(console.log);
});

const bearerStrategy = new BearerStrategy((token, done) => {
  db.Visitor.findOne({ jwtoken: token})
  .exec()
  .then((foundVisitor) => {
    if (!foundVisitor) {
      return done(null, false)
    }
    done(null, foundVisitor)
  });
});

module.exports.bearerStrategy = bearerStrategy;
module.exports.localStrategy = localStrategy;