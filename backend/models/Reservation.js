const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  tableNumber: {
    type: String,
    required: [true, 'Table number is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'Minimum 1 guest required']
  },
  date: {
    type: Date,
    required: [true, 'Reservation date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  eventType: {
    type: String,
    enum: ['Regular Dining', 'Birthday', 'Business Meeting', 'Family Gathering', 'Anniversary'],
    default: 'Regular Dining'
  },
  charge: {
    type: Number,
    default: 0
  },
  specialRequests: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
reservationSchema.index({ date: 1, tableNumber: 1 });
reservationSchema.index({ status: 1 });

module.exports = mongoose.model('Reservation', reservationSchema); 