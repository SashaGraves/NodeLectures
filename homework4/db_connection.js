const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/nodelect');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const UserSchema = new mongoose.Schema(
  {name: String,
  IP: String}
);
const User = mongoose.model('User', UserSchema);

module.exports.User = User;
