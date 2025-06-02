const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['appetizers', 'main course', 'desserts', 'beverages', 'special']
  },
  image: {
    type: String,
    default: 'default-menu.jpg'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  ingredients: [{
    type: String,
    required: true
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  customization: {
    type: Boolean,
    default: false
  },
  customizationOptions: [{
    name: String,
    price: Number
  }]
}, {
  timestamps: true
});

// Index for faster searches
menuSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Menu', menuSchema); 