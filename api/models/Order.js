const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String,
      _id: false
    }
  ],
  total: Number,
  status: { type: String, default: 'pending' },
  type: String,
  orderTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema); 