import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  IconButton,
  Alert,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Paper,
  CardActions,
  Divider,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Restaurant as RecipeIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  AddCircle as AddCircleIcon,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  LocalDining as LocalDiningIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Inventory = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: 'Rice',
      quantity: 100,
      unit: 'kg',
      threshold: 20,
      supplier: 'Local Grains Supplier',
      category: 'Grains',
    },
    {
      id: 2,
      name: 'Urad Dal',
      quantity: 50,
      unit: 'kg',
      threshold: 10,
      supplier: 'Pulses Wholesale',
      category: 'Pulses',
    },
    {
      id: 3,
      name: 'Tomatoes',
      quantity: 30,
      unit: 'kg',
      threshold: 5,
      supplier: 'Fresh Vegetables Market',
      category: 'Vegetables',
    },
    {
      id: 4,
      name: 'Onions',
      quantity: 40,
      unit: 'kg',
      threshold: 8,
      supplier: 'Fresh Vegetables Market',
      category: 'Vegetables',
    },
    {
      id: 5,
      name: 'Cooking Oil',
      quantity: 50,
      unit: 'L',
      threshold: 10,
      supplier: 'Wholesale Mart',
      category: 'Oil & Fats',
    },
    {
      id: 6,
      name: 'Wheat Flour',
      quantity: 80,
      unit: 'kg',
      threshold: 15,
      supplier: 'Local Grains Supplier',
      category: 'Grains',
    },
    {
      id: 7,
      name: 'Fresh Cream',
      quantity: 20,
      unit: 'L',
      threshold: 5,
      supplier: 'Dairy Supplier',
      category: 'Dairy',
    },
    {
      id: 8,
      name: 'Milk',
      quantity: 50,
      unit: 'L',
      threshold: 10,
      supplier: 'Dairy Supplier',
      category: 'Dairy',
    },
    {
      id: 9,
      name: 'Vanilla Extract',
      quantity: 2,
      unit: 'L',
      threshold: 0.5,
      supplier: 'Flavor Supplies',
      category: 'Flavoring',
    },
    {
      id: 10,
      name: 'Sugar',
      quantity: 60,
      unit: 'kg',
      threshold: 15,
      supplier: 'Wholesale Mart',
      category: 'Sweeteners',
    },
    {
      id: 11,
      name: 'Strawberries',
      quantity: 15,
      unit: 'kg',
      threshold: 3,
      supplier: 'Fresh Fruits Market',
      category: 'Fruits',
    },
    {
      id: 12,
      name: 'Butterscotch Syrup',
      quantity: 5,
      unit: 'L',
      threshold: 1,
      supplier: 'Flavor Supplies',
      category: 'Flavoring',
    },
    {
      id: 13,
      name: 'Pizza Base',
      quantity: 100,
      unit: 'pieces',
      threshold: 20,
      supplier: 'Bakery Supplies',
      category: 'Bread',
    },
    {
      id: 14,
      name: 'Mozzarella Cheese',
      quantity: 25,
      unit: 'kg',
      threshold: 5,
      supplier: 'Dairy Supplier',
      category: 'Dairy',
    },
    {
      id: 15,
      name: 'Basil',
      quantity: 2,
      unit: 'kg',
      threshold: 0.5,
      supplier: 'Fresh Herbs Market',
      category: 'Herbs',
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openRecipeDialog, setOpenRecipeDialog] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    threshold: '',
    supplier: '',
    category: '',
  });

  const [lowStockItems, setLowStockItems] = useState([]);

  const [recipeForm, setRecipeForm] = useState({
    name: '',
    description: '',
    ingredients: [],
    preparationTime: '',
    cookingTime: '',
    servings: '',
    category: '',
  });

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Butter Chicken',
      description: 'Creamy and rich Indian curry made with tender chicken pieces in a spiced tomato and butter sauce',
      ingredients: [
        { id: 1, name: 'Chicken', quantity: 500, unit: 'g' },
        { id: 2, name: 'Yogurt', quantity: 200, unit: 'g' },
        { id: 3, name: 'Tomatoes', quantity: 4, unit: 'pieces' },
        { id: 4, name: 'Butter', quantity: 100, unit: 'g' },
        { id: 5, name: 'Heavy Cream', quantity: 100, unit: 'ml' },
        { id: 6, name: 'Garam Masala', quantity: 2, unit: 'tsp' },
        { id: 7, name: 'Ginger Garlic Paste', quantity: 2, unit: 'tbsp' },
        { id: 8, name: 'Kashmiri Red Chili Powder', quantity: 1, unit: 'tsp' },
      ],
      preparationTime: '30 mins',
      cookingTime: '45 mins',
      servings: 4,
      category: 'Indian',
    },
    {
      id: 2,
      name: 'Biryani',
      description: 'Fragrant rice dish cooked with aromatic spices, meat, and herbs',
      ingredients: [
        { id: 1, name: 'Basmati Rice', quantity: 500, unit: 'g' },
        { id: 2, name: 'Chicken', quantity: 500, unit: 'g' },
        { id: 3, name: 'Onions', quantity: 3, unit: 'pieces' },
        { id: 4, name: 'Yogurt', quantity: 200, unit: 'g' },
        { id: 5, name: 'Biryani Masala', quantity: 3, unit: 'tbsp' },
        { id: 6, name: 'Ghee', quantity: 100, unit: 'g' },
        { id: 7, name: 'Mint Leaves', quantity: 1, unit: 'cup' },
        { id: 8, name: 'Coriander Leaves', quantity: 1, unit: 'cup' },
        { id: 9, name: 'Saffron', quantity: 0.5, unit: 'tsp' },
      ],
      preparationTime: '45 mins',
      cookingTime: '60 mins',
      servings: 6,
      category: 'Indian',
    },
    {
      id: 3,
      name: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spiced potato filling, served with coconut chutney and sambar',
      ingredients: [
        { id: 1, name: 'Rice', quantity: 2, unit: 'cups' },
        { id: 2, name: 'Urad Dal', quantity: 1, unit: 'cup' },
        { id: 3, name: 'Potatoes', quantity: 4, unit: 'pieces' },
        { id: 4, name: 'Onions', quantity: 2, unit: 'pieces' },
        { id: 5, name: 'Mustard Seeds', quantity: 1, unit: 'tsp' },
        { id: 6, name: 'Curry Leaves', quantity: 10, unit: 'pieces' },
        { id: 7, name: 'Green Chilies', quantity: 2, unit: 'pieces' },
        { id: 8, name: 'Ginger', quantity: 1, unit: 'inch' },
      ],
      preparationTime: '8 hours (including soaking)',
      cookingTime: '30 mins',
      servings: 4,
      category: 'South Indian',
    },
    {
      id: 4,
      name: 'Palak Paneer',
      description: 'Creamy spinach curry with soft paneer cubes, flavored with Indian spices',
      ingredients: [
        { id: 1, name: 'Paneer', quantity: 250, unit: 'g' },
        { id: 2, name: 'Spinach', quantity: 500, unit: 'g' },
        { id: 3, name: 'Onions', quantity: 2, unit: 'pieces' },
        { id: 4, name: 'Tomatoes', quantity: 2, unit: 'pieces' },
        { id: 5, name: 'Ginger Garlic Paste', quantity: 1, unit: 'tbsp' },
        { id: 6, name: 'Cumin Seeds', quantity: 1, unit: 'tsp' },
        { id: 7, name: 'Garam Masala', quantity: 1, unit: 'tsp' },
        { id: 8, name: 'Fresh Cream', quantity: 100, unit: 'ml' },
      ],
      preparationTime: '20 mins',
      cookingTime: '30 mins',
      servings: 4,
      category: 'Indian',
    },
    {
      id: 5,
      name: 'Chole Bhature',
      description: 'Spicy chickpea curry served with deep-fried bread',
      ingredients: [
        { id: 1, name: 'Chickpeas', quantity: 2, unit: 'cups' },
        { id: 2, name: 'All Purpose Flour', quantity: 3, unit: 'cups' },
        { id: 3, name: 'Onions', quantity: 2, unit: 'pieces' },
        { id: 4, name: 'Tomatoes', quantity: 3, unit: 'pieces' },
        { id: 5, name: 'Chole Masala', quantity: 2, unit: 'tbsp' },
        { id: 6, name: 'Ginger', quantity: 1, unit: 'inch' },
        { id: 7, name: 'Green Chilies', quantity: 2, unit: 'pieces' },
        { id: 8, name: 'Yogurt', quantity: 1, unit: 'cup' },
      ],
      preparationTime: '8 hours (including soaking)',
      cookingTime: '45 mins',
      servings: 4,
      category: 'North Indian',
    },
  ]);

  const [recipeViewTab, setRecipeViewTab] = useState(0);

  useEffect(() => {
    const lowStock = ingredients.filter(
      (item) => item.quantity <= item.threshold
    );
    setLowStockItems(lowStock);
  }, [ingredients]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (ingredient = null) => {
    if (ingredient) {
      setSelectedIngredient(ingredient);
      setFormData(ingredient);
    } else {
      setSelectedIngredient(null);
      setFormData({
        name: '',
        quantity: '',
        unit: '',
        threshold: '',
        supplier: '',
        category: '',
      });
    }
    setOpenDialog(true);
  };

  const handleOpenRecipeDialog = (recipe = null) => {
    if (recipe) {
      setSelectedRecipe(recipe);
      setRecipeForm(recipe);
    } else {
      setSelectedRecipe(null);
      setRecipeForm({
        name: '',
        description: '',
        ingredients: [],
        preparationTime: '',
        cookingTime: '',
        servings: '',
        category: '',
      });
    }
    setOpenRecipeDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIngredient(null);
  };

  const handleCloseRecipeDialog = () => {
    setOpenRecipeDialog(false);
    setSelectedRecipe(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedIngredient) {
      setIngredients((prev) =>
        prev.map((item) =>
          item.id === selectedIngredient.id ? { ...formData, id: item.id } : item
        )
      );
    } else {
      const newIngredient = {
        ...formData,
        id: ingredients.length + 1,
      };
      setIngredients((prev) => [...prev, newIngredient]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const getIngredientName = (id) => {
    const ingredient = ingredients.find(ing => ing.id === id);
    return ingredient ? ingredient.name : 'Unknown';
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'category', headerName: 'Category', width: 130 },
    { 
      field: 'quantity', 
      headerName: 'Quantity', 
      width: 130,
      renderCell: (params) => (
        <Typography>
          {params.value} {params.row.unit}
        </Typography>
      )
    },
    { 
      field: 'threshold', 
      headerName: 'Threshold', 
      width: 130,
      renderCell: (params) => (
        <Typography>
          {params.value} {params.row.unit}
        </Typography>
      )
    },
    { field: 'supplier', headerName: 'Supplier', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.quantity <= params.row.threshold ? 'Low Stock' : 'In Stock'}
          color={params.row.quantity <= params.row.threshold ? 'error' : 'success'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const getInventoryStats = () => {
    const totalItems = ingredients.length;
    const lowStockItems = ingredients.filter(item => item.quantity <= item.threshold).length;
    const categories = [...new Set(ingredients.map(item => item.category))];
    const totalValue = ingredients.reduce((sum, item) => sum + (item.quantity * 100), 0); // Assuming each unit costs 100

    return {
      totalItems,
      lowStockItems,
      categories: categories.length,
      totalValue,
    };
  };

  const getCategoryData = () => {
    const categoryMap = {};
    ingredients.forEach(item => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = 0;
      }
      categoryMap[item.category] += item.quantity;
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getStockStatusData = () => {
    const lowStock = ingredients.filter(item => item.quantity <= item.threshold).length;
    const inStock = ingredients.length - lowStock;

    return [
      { name: 'Low Stock', value: lowStock },
      { name: 'In Stock', value: inStock },
    ];
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleRecipeInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    setRecipeForm((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { id: Date.now(), name: '', quantity: '', unit: '' },
      ],
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setRecipeForm((prev) => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value,
      };
      return {
        ...prev,
        ingredients: newIngredients,
      };
    });
  };

  const handleRemoveIngredient = (index) => {
    setRecipeForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleRecipeSubmit = () => {
    if (selectedRecipe) {
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === selectedRecipe.id ? { ...recipeForm, id: recipe.id } : recipe
        )
      );
    } else {
      const newRecipe = {
        ...recipeForm,
        id: Date.now(),
      };
      setRecipes((prev) => [...prev, newRecipe]);
    }
    handleCloseRecipeDialog();
  };

  const handleDeleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const recipeColumns = [
    { field: 'name', headerName: 'Recipe Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'preparationTime', headerName: 'Prep Time', width: 130 },
    { field: 'cookingTime', headerName: 'Cooking Time', width: 130 },
    { field: 'servings', headerName: 'Servings', width: 100 },
    {
      field: 'ingredients',
      headerName: 'Ingredients',
      width: 200,
      renderCell: (params) => (
        <Typography>
          {params.value.length} ingredients
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenRecipeDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteRecipe(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="inventory tabs">
          <Tab label="Dashboard" />
          <Tab label="Ingredients" />
          <Tab label="Recipes" />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index={0}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Inventory Dashboard
          </Typography>
          
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CategoryIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Total Items
                      </Typography>
                      <Typography variant="h4">
                        {getInventoryStats().totalItems}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Low Stock Items
                      </Typography>
                      <Typography variant="h4" color="error.main">
                        {getInventoryStats().lowStockItems}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Categories
                      </Typography>
                      <Typography variant="h4">
                        {getInventoryStats().categories}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Total Value
                      </Typography>
                      <Typography variant="h4">
                        ₹{getInventoryStats().totalValue}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Inventory by Category
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getCategoryData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Stock Status
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getStockStatusData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {getStockStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              Warning: {lowStockItems.length} items are running low on stock!
            </Alert>
          )}
        </Box>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h4">Inventory Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Ingredient
          </Button>
        </Box>

        {lowStockItems.length > 0 && (
          <Alert severity="warning" sx={{ mb: 1 }}>
            {lowStockItems.length} items are running low on stock!
          </Alert>
        )}

        <DataGrid
          rows={ingredients}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          sx={{ 
            '& .MuiDataGrid-cell': {
              py: 1,
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
          }}
        />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={recipeViewTab} onChange={(e, newValue) => setRecipeViewTab(newValue)}>
            <Tab label="Manage Recipes" />
            <Tab label="View Recipes" />
          </Tabs>
        </Box>

        {recipeViewTab === 0 ? (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4">Recipe Management</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenRecipeDialog()}
              >
                Add Recipe
              </Button>
            </Box>

            <DataGrid
              rows={recipes}
              columns={recipeColumns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight
            />
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              All Recipes
            </Typography>
            <Grid container spacing={3}>
              {recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" component="h2">
                          {recipe.name}
                        </Typography>
                        <Chip
                          label={recipe.category}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      
                      <Typography color="text.secondary" paragraph>
                        {recipe.description}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          <TimeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Preparation: {recipe.preparationTime}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          <TimeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Cooking: {recipe.cookingTime}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          <PeopleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Servings: {recipe.servings}
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="h6" gutterBottom>
                        <LocalDiningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Ingredients
                      </Typography>
                      <List dense>
                        {recipe.ingredients.map((ingredient, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={ingredient.name}
                              secondary={`${ingredient.quantity} ${ingredient.unit}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenRecipeDialog(recipe)}
                      >
                        Edit
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </TabPanel>

      {/* Ingredient Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedIngredient ? 'Edit Ingredient' : 'Add New Ingredient'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ingredient Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Threshold"
                name="threshold"
                type="number"
                value={formData.threshold}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedIngredient ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Recipe Dialog */}
      <Dialog open={openRecipeDialog} onClose={handleCloseRecipeDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRecipe ? 'Edit Recipe' : 'Add New Recipe'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipe Name"
                name="name"
                value={recipeForm.name}
                onChange={handleRecipeInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={recipeForm.description}
                onChange={handleRecipeInputChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={recipeForm.category}
                onChange={handleRecipeInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Servings"
                name="servings"
                value={recipeForm.servings}
                onChange={handleRecipeInputChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preparation Time"
                name="preparationTime"
                value={recipeForm.preparationTime}
                onChange={handleRecipeInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cooking Time"
                name="cookingTime"
                value={recipeForm.cookingTime}
                onChange={handleRecipeInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Ingredients</Typography>
                <Button
                  startIcon={<AddCircleIcon />}
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </Button>
              </Box>
              {recipeForm.ingredients.map((ingredient, index) => (
                <Grid container spacing={2} key={ingredient.id} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Ingredient Name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      type="number"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Unit"
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRecipeDialog}>Cancel</Button>
          <Button onClick={handleRecipeSubmit} variant="contained">
            {selectedRecipe ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory; 