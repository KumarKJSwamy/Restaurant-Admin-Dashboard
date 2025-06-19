const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const menuController = require('../controllers/menu.controller');
const { auth, adminAuth } = require('../middleware/auth.middleware');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Validation middleware
const menuItemValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['appetizer', 'main course', 'dessert', 'beverage'])
    .withMessage('Invalid category'),
  body('preparationTime')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Preparation time must be a positive number'),
  body('ingredients')
    .optional()
    .isArray()
    .withMessage('Ingredients must be an array'),
  body('nutritionalInfo')
    .optional()
    .isObject()
    .withMessage('Nutritional info must be an object'),
  body('allergens')
    .optional()
    .isArray()
    .withMessage('Allergens must be an array')
];

// Routes
router.post(
  '/',
  auth,
  adminAuth,
  upload.single('image'),
  menuItemValidation,
  menuController.createMenuItem
);

router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItem);

router.put(
  '/:id',
  auth,
  adminAuth,
  upload.single('image'),
  menuItemValidation,
  menuController.updateMenuItem
);

router.delete(
  '/:id',
  auth,
  adminAuth,
  menuController.deleteMenuItem
);

module.exports = router; 