const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  gender: {
    type: String,
    default: 'Male',
  },
  age: {
    type: Number,
    required: [true, 'Please indicate your age'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
