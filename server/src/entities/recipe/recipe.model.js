const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: { type: String, required: true }, 
      quantity: { type: Number, required: true }, 
      unit: { type: String, required: true }, 
      notes: { type: String }, 
    },
  ],
  instructions: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    default: 'default.jpg',
  },
  season: {
    type: String,
    enum: ['printemps', 'été', 'automne', 'hiver'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments : {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comments',
    default: [],
  },
  favorites : {
    type: Number,
    default:0,
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);