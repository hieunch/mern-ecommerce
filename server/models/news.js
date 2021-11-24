const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// Product Schema
const NewsSchema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
  keywords: {
    type: String
  },
  thumbnail: {
    type: String
  },
  content: {
    type: String
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('News', NewsSchema);
