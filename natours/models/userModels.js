const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User emeil is required'],
  },
  role: {
    type: String,
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
