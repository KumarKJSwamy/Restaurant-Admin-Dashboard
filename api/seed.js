const Category = require('./models/category.model');
const MenuItem = require('./models/menuItem.model');

const staticCategories = [
  { name: 'BREAKFAST', description: 'Breakfast items' },
  { name: 'LUNCH', description: 'Lunch items' },
  { name: 'ICE CREAM', description: 'Ice cream desserts' },
  { name: 'PIZZA', description: 'Pizza varieties' },
  { name: 'DRINKS', description: 'Beverages' },
  { name: 'DESSERTS', description: 'Desserts' },
  { name: 'SALADS', description: 'Salads' }
];

const staticDishes = [
  {
    id: 1,
    name: 'Idly',
    category: 'BREAKFAST',
    description: 'Soft and fluffy steamed rice cakes served with sambar and chutney.',
    price: 30.00,
    rating: 4.8,
    preparationTime: 15,
    image: 'https://i.pinimg.com/736x/01/65/17/01651769c6a528ef17f6e122b922f8dc.jpg',
  },
  {
    id: 2,
    name: 'Dosa',
    category: 'BREAKFAST',
    description: 'Crispy fermented rice and lentil crepe served with sambar and chutney.',
    price: 40.00,
    rating: 4.9,
    preparationTime: 15,
    image: 'https://i.pinimg.com/736x/e8/48/ca/e848ca06cc72cfb473c1d96f2ea75183.jpg',
  },
  {
    id: 3,
    name: 'Lemon Rice',
    category: 'LUNCH',
    description: 'Tangy rice dish flavored with lemon, peanuts, and curry leaves.',
    price: 60.00,
    rating: 4.5,
    preparationTime: 20,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FRXGWcGfCxy3bXI0ZlyRITlerfBL4k5krQ&s',
  },
  {
    id: 4,
    name: 'Poori',
    category: 'BREAKFAST',
    description: 'Deep-fried bread served with potato curry.',
    price: 50.00,
    rating: 4.6,
    preparationTime: 15,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYpkoxfEC8atsB34GwIgWROSllY6nwKlwNRQ&s',
  },
  {
    id: 5,
    name: 'North Indian Thali',
    category: 'LUNCH',
    description: 'Complete North Indian meal with roti, dal, sabzi, rice, and accompaniments.',
    price: 150.00,
    rating: 4.7,
    preparationTime: 25,
    image: 'https://premasculinary.com/wp-content/uploads/2022/05/North-Indian-Thali-Recipe-1.jpg',
  },
  {
    id: 6,
    name: 'South Indian Meals',
    category: 'LUNCH',
    description: 'Traditional South Indian meal with rice, sambar, rasam, and vegetables.',
    price: 120.00,
    rating: 4.8,
    preparationTime: 20,
    image: 'https://5.imimg.com/data5/IM/KH/GLADMIN-21954819/south-indian-full-meals-250x250.jpg',
  },
  {
    id: 7,
    name: 'Veg Biriyani',
    category: 'LUNCH',
    description: 'Aromatic rice dish cooked with mixed vegetables and special spices.',
    price: 130.00,
    rating: 4.9,
    preparationTime: 30,
    image: 'https://static.wixstatic.com/media/91e241_0cf76aa5613b4055be2f922f71edeaa0~mv2.jpg/v1/fill/w_560,h_372,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ustaadi%20Hyderabadi%20Veg%20Biryani.jpg',
  },
  {
    id: 8,
    name: 'Vanilla Ice Cream',
    category: 'ICE CREAM',
    description: 'Classic vanilla ice cream made with real Madagascar vanilla.',
    price: 40.00,
    rating: 4.7,
    preparationTime: 15,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371',
  },
  { 
    id: 9, 
    name: 'Strawberry Ice Cream', 
    price: 45.00, 
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364',
    description: 'Creamy strawberry ice cream made with fresh strawberries.',
    category: 'ICE CREAM',
    rating: 4.8,
    preparationTime: 10
  },
  { 
    id: 10, 
    name: 'Butterscotch Ice Cream', 
    price: 45.00, 
    image: 'https://static.toiimg.com/thumb/84014919.cms?imgsize=306932&width=800&height=800',
    description: 'Rich butterscotch ice cream with caramel swirls.',
    category: 'ICE CREAM',
    rating: 4.9,
    preparationTime: 15
  },
  {
    id: 11,
    name: 'Margherita Pizza',
    category: 'PIZZA',
    price: 199.00,
    description: 'Fresh tomatoes, mozzarella, and basil',
    image: 'https://imgmediagumlet.lbb.in/media/2023/02/63e39a8dc9ae884e143db091_1675860621236.jpg',
    rating: 4.5,
    preparationTime: 20
  }
];

async function seedCategories() {
  console.log('Seeding categories...');
  const categoriesMap = {};
  
  for (const category of staticCategories) {
    try {
      const existingCategory = await Category.findOne({ name: category.name });
      if (existingCategory) {
        console.log(`Category "${category.name}" already exists.`);
        categoriesMap[category.name] = existingCategory._id;
        continue;
      }

      const newCategory = await Category.create(category);
      console.log(`Category "${category.name}" created.`);
      categoriesMap[category.name] = newCategory._id;
    } catch (error) {
      console.error(`Error creating category "${category.name}":`, error.message);
    }
  }
  
  return categoriesMap;
}

async function seedDishes(categoriesMap) {
  console.log('Seeding dishes...');
  
  for (const dish of staticDishes) {
    try {
      const existingDish = await MenuItem.findOne({ name: dish.name });
      if (existingDish) {
        console.log(`Dish "${dish.name}" already exists.`);
        continue;
      }

      const dishWithCategory = {
        ...dish,
        category: categoriesMap[dish.category]
      };

      await MenuItem.create(dishWithCategory);
      console.log(`Dish "${dish.name}" created.`);
    } catch (error) {
      console.error(`Error creating dish "${dish.name}":`, error.message);
    }
  }
}

async function runSeed() {
  try {
    const categoriesMap = await seedCategories();
    await seedDishes(categoriesMap);
    return 'Seeding completed successfully';
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  }
}

module.exports = runSeed;
