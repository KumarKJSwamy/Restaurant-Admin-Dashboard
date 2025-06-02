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
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Stack,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Category as CategoryIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import MenuItems from '../components/MenuItems';
import { toast } from 'react-toastify';
import { menuAPI, categoryAPI, ordersAPI } from '../services/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MenuManagement = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [managementTab, setManagementTab] = useState(0); // 0 for dishes, 1 for categories
  const [dishes, setDishes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    rating: '',
    preparationTime: '',
  });

  const [orders, setOrders] = useState([]);

  const [editOrderDialog, setEditOrderDialog] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleManagementTabChange = (event, newValue) => {
    setManagementTab(newValue);
  };

  const handleOpenDialog = (dish = null) => {
    if (dish) {
      setSelectedDish(dish);
      setFormData({
        ...dish,
        category: dish.category._id || dish.category
      });
    } else {
      setSelectedDish(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        image: '',
        rating: '',
        preparationTime: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDish(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      // Find the full category object
      const selectedCat = categories.find(cat => cat._id === value);
      setFormData((prev) => ({
        ...prev,
        category: selectedCat || value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const menuItemData = {
        ...formData,
        category: formData.category._id || formData.category
      };

      if (selectedDish) {
        // Update existing dish
        const response = await menuAPI.update(selectedDish._id, menuItemData);
        if (response.data.success) {
          setDishes(prev => 
            prev.map(dish => dish._id === selectedDish._id ? response.data.data : dish)
          );
          toast.success('Dish updated successfully');
        }
      } else {
        // Create new dish
        const response = await menuAPI.create(menuItemData);
        if (response.data.success) {
          setDishes(prev => [...prev, response.data.data]);
          toast.success('Dish created successfully');
        }
      }
      handleCloseDialog();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving dish');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await menuAPI.delete(id);
      if (response.data.success) {
        setDishes(prev => prev.filter(dish => dish._id !== id));
        toast.success('Dish deleted successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting dish');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCategoryDialog = (category = null) => {
    setSelectedCategory(category);
    setCategoryFormData(category ? category.name : '');
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setSelectedCategory(null);
    setCategoryFormData('');
  };

  const handleCategorySubmit = async () => {
    try {
      setLoading(true);
      const categoryData = {
        name: categoryFormData,
        description: `Category for ${categoryFormData}`
      };

      if (selectedCategory) {
        // Update existing category
        const response = await categoryAPI.update(selectedCategory._id, categoryData);
        if (response.data.success) {
          setCategories(prev => 
            prev.map(cat => cat._id === selectedCategory._id ? response.data.data : cat)
          );
          toast.success('Category updated successfully');
        }
      } else {
        // Create new category
        const response = await categoryAPI.create(categoryData);
        if (response.data.success) {
          setCategories(response.data.data);
          toast.success('Category created successfully');
        }
      }
      handleCloseCategoryDialog();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      setLoading(true);
      const response = await categoryAPI.delete(category._id);
      if (response.data.success) {
        setCategories(prev => prev.filter(cat => cat._id !== category._id));
        toast.success('Category deleted successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting category');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      valueGetter: (params) =>
        typeof params.row.category === 'object'
          ? params.row.category.name
          : params.row.category,
    },
    { field: 'price', headerName: 'Price', width: 100, valueFormatter: (params) => `₹${params.value.toFixed(2)}` },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'preparationTime', headerName: 'Prep Time', width: 100, valueFormatter: (params) => `${params.value} min` },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const [cart, setCart] = useState([]);
  const [orderDialog, setOrderDialog] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleQuantityChange = (itemId, change) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        if (newQuantity <= 0) {
          return prevCart.filter(item => item.id !== itemId);
        }
        return prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
      } else if (change > 0) {
        const menuItem = dishes.find(item => item.id === itemId);
        return [...prevCart, { ...menuItem, quantity: 1 }];
      }
      return prevCart;
    });
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrderSubmit = () => {
    if (!customerDetails.name) {
      toast.error('Please fill in required customer details');
      return;
    }
    // Create order object
    console.log(customerDetails, dishes, "menuItemdss");
    const order = {
      id: Date.now(),
      customerName: customerDetails.name,
      phone: customerDetails.phone,
      address: customerDetails.address,
      items: cart.map(item => {
        const menuItem = dishes.find(m => m._id === item._id);
        return {
          ...item,
          image: menuItem && menuItem?.image || 'https://via.placeholder.com/60'
        };
      }),
      total: calculateTotal(),
      status: 'pending',
      type: 'takeaway',
      orderTime: new Date().toISOString(),
    };
    // Here you would typically send this to your backend
    console.log('New Takeaway Order:', order);
    toast.success('Order placed successfully!');
    // Reset cart and close dialog
    setCart([]);
    setCustomerDetails({ name: '', phone: '', address: '' });
    setOrderDialog(false);
  };

  const filteredItems = selectedCategory === 'all'
    ? dishes
    : dishes.filter(item => item.category?._id === selectedCategory);

  // Helper to normalize dishes so category is always an object
  function normalizeDishes(dishes, categories) {
    return dishes?.map(dish => {
      if (typeof dish.category === 'object') return dish;
      const catObj = categories.find(cat => cat?._id === dish.category || cat.name === dish.category);
      return { ...dish, category: catObj || dish.category };
    });
  }

  // Fetch dishes and categories on component mount
  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentTab === 1) fetchOrders();
  }, [currentTab]);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAll();
      if (response.data.success) {
        setDishes(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching dishes');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAll();
      if (response.data.success) {
        setCategories(response.data.data);
        setDishes(prev => normalizeDishes(prev, response.data.data));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      if (response.data.success) setOrders(response.data.data);
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const handleEditOrder = (order) => {
    setOrderToEdit(order);
    setEditOrderDialog(true);
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await ordersAPI.delete(orderId);
      toast.success('Order deleted');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await ordersAPI.update(orderToEdit._id, orderToEdit);
      toast.success('Order updated');
      setEditOrderDialog(false);
      setOrderToEdit(null);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} thickness={5} color="primary" />
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={currentTab} onChange={handleTabChange} aria-label="menu management tabs">
              <Tab label="Menu Items" />
              <Tab label="Orders" />
              <Tab label="Menu Management" />
            </Tabs>
          </Box>

          <TabPanel value={currentTab} index={0}>
            <MenuItems categories={categories} />
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Box>
              <Typography variant="h4" gutterBottom>Orders</Typography>
              {orders.length === 0 ? (
                <Typography>No orders found.</Typography>
              ) : (
                <Grid container spacing={3}>
                  {orders.map(order => (
                    <Grid item xs={12} md={8} key={order._id || order.id}>
                      <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <Typography variant="h6">
                            {order.customerName} ({order.type}) - {new Date(order.orderTime).toLocaleString()}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                            {order.items.map((item, idx) => (
                              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, background: '#f5f5f5', borderRadius: 2, p: 1 }}>
                                <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: 8 }} />
                                <Box>
                                  <Typography>{item.name} x{item.quantity}</Typography>
                                  <Typography variant="caption" color="text.secondary">₹{item.price * item.quantity}</Typography>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                          <Typography sx={{ mt: 1 }}><b>Total:</b> ₹{order.total}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                          <IconButton color="primary" onClick={() => handleEditOrder(order)}><EditIcon /></IconButton>
                          <IconButton color="error" onClick={() => handleDeleteOrder(order._id)}><DeleteIcon /></IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
              {/* Edit Order Dialog */}
              <Dialog open={editOrderDialog} onClose={() => setEditOrderDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Order</DialogTitle>
                <DialogContent>
                  {orderToEdit && (
                    <>
                      <TextField
                        fullWidth
                        label="Customer Name"
                        value={orderToEdit.customerName}
                        onChange={e => setOrderToEdit({ ...orderToEdit, customerName: e.target.value })}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Phone"
                        value={orderToEdit.phone}
                        onChange={e => setOrderToEdit({ ...orderToEdit, phone: e.target.value })}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Address"
                        value={orderToEdit.address}
                        onChange={e => setOrderToEdit({ ...orderToEdit, address: e.target.value })}
                        sx={{ mb: 2 }}
                      />
                      {/* You can add more fields for editing items if needed */}
                    </>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setEditOrderDialog(false)}>Cancel</Button>
                  <Button onClick={handleUpdateOrder} variant="contained" color="primary">Update</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={managementTab} onChange={handleManagementTabChange} aria-label="management options">
                  <Tab label="Dishes" />
                  <Tab label="Categories" />
                </Tabs>
              </Box>

              <TabPanel value={managementTab} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h4">Dish Management</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                  >
                    Add Dish
                  </Button>
                </Box>

                <DataGrid
                  rows={dishes}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  autoHeight
                  getRowId={(row) => row._id}
                />
              </TabPanel>

              <TabPanel value={managementTab} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h4">Category Management</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CategoryIcon />}
                    onClick={() => handleOpenCategoryDialog()}
                    disabled={loading}
                  >
                    Add Category
                  </Button>
                </Box>

                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <List>
                    {categories.map((category) => (
                      <ListItem
                        key={category._id}
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          mb: 1,
                        }}
                      >
                        <ListItemText 
                          primary={category.name}
                          secondary={category.description}
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            onClick={() => handleOpenCategoryDialog(category)}
                            disabled={loading}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            onClick={() => handleDeleteCategory(category)}
                            disabled={loading}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </TabPanel>
            </Box>
          </TabPanel>

          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
              {selectedDish ? 'Edit Dish' : 'Add New Dish'}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dish Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category?._id || formData.category}
                      onChange={handleInputChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: <Typography>₹</Typography>
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Preparation Time (minutes)"
                    name="preparationTime"
                    type="number"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Rating"
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained">
                {selectedDish ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
              {selectedCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Category Name"
                value={categoryFormData}
                onChange={(e) => setCategoryFormData(e.target.value)}
                sx={{ mt: 2 }}
                disabled={loading}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCategoryDialog} disabled={loading}>
                Cancel
              </Button>
              <Button 
                onClick={handleCategorySubmit} 
                variant="contained"
                disabled={loading || !categoryFormData.trim()}
              >
                {loading ? <CircularProgress size={24} /> : selectedCategory ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* <Dialog open={orderDialog} onClose={() => setOrderDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Customer Name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Delivery Address"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Order Summary
                    </Typography>
                    {cart.map((item) => (
                      <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>
                          {item.name} x {item.quantity}
                        </Typography>
                        <Typography>
                          ₹{item.price * item.quantity}
                        </Typography>
                      </Box>
                    ))}
                    <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 1, mt: 1 }}>
                      <Typography variant="h6">
                        Total: ₹{calculateTotal()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOrderDialog(false)}>Cancel</Button>
              <Button onClick={handleOrderSubmit} variant="contained" color="primary">
                Confirm Order
              </Button>
            </DialogActions>
          </Dialog> */}
        </>
      )}
    </Box>
  );
};

export default MenuManagement; 