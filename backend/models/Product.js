// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  brand: {
    type: String,
    default: 'Beauty Blends'
  },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
