const mongoose = require('mongoose'); 
const orderSchema = new mongoose.Schema({
  userEmail: String,
  billingDetails: {
    name: String,
    email: String,
    address: String,
  },
  products: [
    {
      _id: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
