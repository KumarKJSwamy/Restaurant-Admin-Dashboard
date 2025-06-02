const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { auth, adminAuth } = require('../middleware/auth.middleware');

// Validation middleware
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('description')
    .optional()
    .trim()
];

// Routes
router.post(
  '/',
  auth,
  adminAuth,
  categoryValidation,
  categoryController.createCategory
);

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);

router.put(
  '/:id',
  auth,
  adminAuth,
  categoryValidation,
  categoryController.updateCategory
);

router.delete(
  '/:id',
  auth,
  adminAuth,
  categoryController.deleteCategory
);

module.exports = router; 