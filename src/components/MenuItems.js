import React, { useState, useEffect } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Chip,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { menuAPI, categoryAPI, ordersAPI } from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [orderDialog, setOrderDialog] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
  });
  const [orders, setOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (currentTab === 2) fetchOrders();
  }, [currentTab]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await menuAPI.getAll();
      if (response.data.success) {
        setMenuItems(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryAPI.getAll();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await ordersAPI.getAll();
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleQuantityChange = (itemId, change) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === itemId);
      if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        if (newQuantity <= 0) {
          return prevCart.filter(item => item._id !== itemId);
        }
        return prevCart.map(item =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
      } else if (change > 0) {
        const menuItem = menuItems.find(item => item._id === itemId);
        return [...prevCart, { ...menuItem, quantity: 1 }];
      }
      return prevCart;
    });
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cart.find(item => item._id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrderSubmit = async () => {
    if (!customerDetails.name ||  !customerDetails.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    console.log(menuItems, cart, customerDetails, "menuItems");
    const order = {
      customerName: customerDetails.name,
      phone: customerDetails.phone,
      address: customerDetails.address,
      items: cart.map(item => {
        const menuItem = menuItems.find(m => m?._id === item?._id);
        return {
          ...item,
          image: menuItem?.image
        };
      }),
      total: calculateTotal(),
      status: 'pending',
      type: 'takeaway',
      orderTime: new Date().toISOString(),
    };
    try {
      await ordersAPI.create(order);
      toast.success('Order placed successfully!');
      setCart([]);
      setCustomerDetails({ name: '', phone: '', address: '' });
      setOrderDialog(false);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  const filteredItems = selectedCategory === 'ALL'
    ? menuItems
    : menuItems.filter(item => {
        const catName = typeof item.category === 'object' ? item.category.name : item.category;
        return catName === selectedCategory;
      });

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} thickness={5} color="primary" />
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="menu categories"
            >
              <Tab label="ALL" value="ALL" />
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  label={category.name}
                  value={category.name}
                />
              ))}
              {/* <Tab label="ORDERS" value="ORDERS" /> */}
            </Tabs>
          </Box>
          <Grid container spacing={3}>
            {/* Menu Items */}
            <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  {filteredItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt={item.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h6" component="div">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {item.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating
                              value={item.rating}
                              precision={0.1}
                              readOnly
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({item.rating})
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              icon={<AccessTimeIcon />}
                              label={`${item.preparationTime} min`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Box>
                              <Typography variant="h6" color="primary">
                                ₹{(item.price * (getItemQuantity(item._id) || 1)).toFixed(2)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Base price: ₹{item.price.toFixed(2)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 0.5 }}>
                              <IconButton 
                                size="small" 
                                onClick={() => handleQuantityChange(item._id, -1)}
                                disabled={getItemQuantity(item._id) === 0}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                                {getItemQuantity(item._id) || 0}
                              </Typography>
                              <IconButton 
                                size="small" 
                                onClick={() => handleQuantityChange(item._id, 1)}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* Cart Summary */}
              <Grid item xs={12} md={3}>
                <Card sx={{ position: 'sticky', top: 20 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Summary
                    </Typography>
                    {cart.length === 0 ? (
                      <Typography color="text.secondary">
                        No items in cart
                      </Typography>
                    ) : (
                      <>
                        <Box sx={{ mb: 2 }}>
                          {cart.map((item) => (
                            <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Box>
                                <Typography variant="body1">
                                  {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  ₹{item.price} x {item.quantity}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ mr: 1 }}>
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </Typography>
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleQuantityChange(item._id, -item.quantity)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Total: ₹{calculateTotal().toFixed(2)}
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<CartIcon />}
                            onClick={() => setOrderDialog(true)}
                            sx={{ mt: 2 }}
                          >
                            Place Takeaway Order
                          </Button>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          {/* Order Dialog */}
          <Dialog open={orderDialog} onClose={() => setOrderDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Customer Details for Takeaway</DialogTitle>
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
                      error={orderDialog && !customerDetails.name}
                      helperText={orderDialog && !customerDetails.name ? 'Name is required' : ''}
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
                      error={orderDialog && !customerDetails.address}
                      helperText={orderDialog && !customerDetails.address ? 'Address is required' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                      Order Summary
                    </Typography>
                    {cart.map((item) => (
                      <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>
                          {item.name} x {item.quantity}
                        </Typography>
                        <Typography>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                    <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 1, mt: 1 }}>
                      <Typography variant="h6">
                        Total: ₹{calculateTotal().toFixed(2)}
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
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default MenuItems; 