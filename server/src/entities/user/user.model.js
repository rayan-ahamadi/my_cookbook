const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'author', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: 'default.jpg',
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Recipes',
    default: [],
  },
  comments : {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comments',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);