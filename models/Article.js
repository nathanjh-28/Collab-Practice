const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, {timestamps: true});


// Create and export the model in one line
module.exports = mongoose.model('Article', ArticleSchema);