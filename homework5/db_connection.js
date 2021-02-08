const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/nodelect');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const VisitorSchema = new mongoose.Schema(
  {username: String,
  password: String,
  jwtoken: String}
);
const Visitor = mongoose.model('Visitor', VisitorSchema);

// const new_visitor = {
//   username: 'Aleksandra Kulikova',
//   password: 'Aleksandra_Kulikova@epam.com',
// };

// const user = new Visitor(new_visitor);
// user.save(function(err) {
//   if (err) return console.log(err)
// });

module.exports.Visitor = Visitor;
