const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateAvailability,
  getCategories,
  getMenuItemsByCategory
} = require('../controllers/menuController');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getMenuItems);
router.get('/categories', getCategories);
router.get('/category/:category', getMenuItemsByCategory);
router.get('/:id', getMenuItem);

// Protected routes (Admin/Manager only)
router.post('/', auth, authorize('admin', 'manager'), upload.single('image'), createMenuItem);
router.put('/:id', auth, authorize('admin', 'manager'), upload.single('image'), updateMenuItem);
router.delete('/:id', auth, authorize('admin', 'manager'), deleteMenuItem);
router.patch('/:id/availability', auth, authorize('admin', 'manager'), updateAvailability);

module.exports = router; 