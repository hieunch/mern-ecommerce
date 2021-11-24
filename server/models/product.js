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
const ProductSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  imageUrl: {
    type: String
  },
  shopeeUrl: {
    type: String
  },
  lazadaUrl: {
    type: String
  },
  tikiUrl: {
    type: String
  },
  imageUrls: [String],
  // imageKey: {
  //   type: String
  // },
  description: {
    type: String,
    // trim: true
  },
  // quantity: {
  //   type: Number
  // },
  price: {
    type: Number
  },
  // taxable: {
  //   type: Boolean,
  //   default: false
  // },
  isActive: {
    type: Boolean,
    default: true
  },
  // brand: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Brand',
  //   default: null
  // },
  sizeAndWeights: [{
    size1: Number, 
    size2: Number, 
    weight1: Number, 
    weight2: Number
  }],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Product', ProductSchema);
