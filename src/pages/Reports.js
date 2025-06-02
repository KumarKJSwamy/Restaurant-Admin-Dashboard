import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  History as HistoryIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// Sample data for tables
const tableData = [
  {
    tableNumber: 1,
    currentOrder: {
      items: ['Butter Chicken', 'Naan', 'Biryani'],
      total: 850,
      status: 'Paid',
      time: '14:30',
    },
    isOccupied: true,
  },
  {
    tableNumber: 2,
    currentOrder: {
      items: ['Paneer Tikka', 'Roti'],
      total: 450,
      status: 'Pending',
      time: '14:45',
    },
    isOccupied: true,
  },
  {
    tableNumber: 3,
    currentOrder: {
      items: ['Masala Dosa', 'Coffee'],
      total: 200,
      status: 'Paid',
      time: '14:15',
    },
    isOccupied: true,
  },
  {
    tableNumber: 4,
    currentOrder: null,
    isOccupied: false,
  },
  {
    tableNumber: 5,
    currentOrder: {
      items: ['Veg Thali', 'Lassi'],
      total: 350,
      status: 'Processing',
      time: '14:50',
    },
    isOccupied: true,
  },
  {
    tableNumber: 6,
    currentOrder: {
      items: ['Fish Curry', 'Rice'],
      total: 500,
      status: 'Paid',
      time: '14:20',
    },
    isOccupied: true,
  },
  {
    tableNumber: 7,
    currentOrder: null,
    isOccupied: false,
  },
  {
    tableNumber: 8,
    currentOrder: {
      items: ['Chicken Biryani', 'Raita'],
      total: 400,
      status: 'Pending',
      time: '14:55',
    },
    isOccupied: true,
  },
  {
    tableNumber: 9,
    currentOrder: {
      items: ['Ice Cream', 'Brownie'],
      total: 250,
      status: 'Paid',
      time: '14:40',
    },
    isOccupied: true,
  },
  {
    tableNumber: 10,
    currentOrder: null,
    isOccupied: false,
  },
];

// Sample data for charts
const monthlyRevenue = [
  { month: 'Jan', revenue: 150000 },
  { month: 'Feb', revenue: 180000 },
  { month: 'Mar', revenue: 220000 },
  { month: 'Apr', revenue: 200000 },
  { month: 'May', revenue: 250000 },
  { month: 'Jun', revenue: 280000 },
];

const categoryRevenue = [
  { name: 'Main Course', value: 45 },
  { name: 'Starters', value: 25 },
  { name: 'Desserts', value: 15 },
  { name: 'Beverages', value: 15 },
];

const dailyOrders = [
  { time: '10:00', orders: 5 },
  { time: '12:00', orders: 15 },
  { time: '14:00', orders: 20 },
  { time: '16:00', orders: 12 },
  { time: '18:00', orders: 18 },
  { time: '20:00', orders: 25 },
  { time: '22:00', orders: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Sample data for previous orders
const previousOrdersData = {
  1: [
    {
      orderId: 'ORD001',
      items: ['Butter Chicken', 'Naan', 'Coke'],
      total: 750,
      status: 'Completed',
      time: '12:30',
      date: '2024-02-20',
    },
    {
      orderId: 'ORD002',
      items: ['Paneer Butter Masala', 'Roti', 'Lassi'],
      total: 550,
      status: 'Completed',
      time: '13:45',
      date: '2024-02-20',
    },
  ],
  2: [
    {
      orderId: 'ORD003',
      items: ['Chicken Biryani', 'Raita'],
      total: 400,
      status: 'Completed',
      time: '11:30',
      date: '2024-02-20',
    },
  ],
  3: [
    {
      orderId: 'ORD004',
      items: ['Masala Dosa', 'Coffee'],
      total: 200,
      status: 'Completed',
      time: '10:15',
      date: '2024-02-20',
    },
  ],
  5: [
    {
      orderId: 'ORD005',
      items: ['Veg Thali', 'Sweet Lassi'],
      total: 350,
      status: 'Completed',
      time: '13:20',
      date: '2024-02-20',
    },
  ],
  6: [
    {
      orderId: 'ORD006',
      items: ['Fish Curry', 'Rice', 'Papad'],
      total: 450,
      status: 'Completed',
      time: '12:45',
      date: '2024-02-20',
    },
  ],
  8: [
    {
      orderId: 'ORD007',
      items: ['Chicken Biryani', 'Raita', 'Coke'],
      total: 500,
      status: 'Completed',
      time: '13:30',
      date: '2024-02-20',
    },
  ],
  9: [
    {
      orderId: 'ORD008',
      items: ['Ice Cream', 'Chocolate Brownie'],
      total: 300,
      status: 'Completed',
      time: '11:45',
      date: '2024-02-20',
    },
  ],
};

// Sample data for popular dishes
const popularDishesData = [
  {
    id: 1,
    name: 'Butter Chicken',
    category: 'Main Course',
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg?quality=90&resize=440,400',
    rating: 4.8,
    totalRatings: 245,
    totalOrders: 520,
    revenue: 78000,
    reviews: [
      { id: 1, user: 'John D.', rating: 5, comment: 'Best butter chicken in town!', date: '2024-02-20' },
      { id: 2, user: 'Sarah M.', rating: 4, comment: 'Delicious and creamy.', date: '2024-02-19' },
    ],
  },
  {
    id: 2,
    name: 'Biryani',
    category: 'Main Course',
    image: 'https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2022/04/68b1e-bangalore-biryani.jpg?fit=1000%2C667&ssl=1',
    rating: 4.7,
    totalRatings: 189,
    totalOrders: 430,
    revenue: 64500,
    reviews: [
      { id: 3, user: 'Mike R.', rating: 5, comment: 'Authentic taste and perfect spices!', date: '2024-02-20' },
      { id: 4, user: 'Emily L.', rating: 4, comment: 'Love the long-grain rice and tender meat.', date: '2024-02-18' },
    ],
  },
  {
    id: 3,
    name: 'Masala Dosa',
    category: 'Breakfast',
    image: 'https://i.pinimg.com/736x/e8/48/ca/e848ca06cc72cfb473c1d96f2ea75183.jpg',
    rating: 4.6,
    totalRatings: 156,
    totalOrders: 380,
    revenue: 38000,
    reviews: [
      { id: 5, user: 'David K.', rating: 5, comment: 'Crispy and perfectly spiced!', date: '2024-02-20' },
      { id: 6, user: 'Lisa P.', rating: 4, comment: 'Great breakfast option.', date: '2024-02-19' },
    ],
  },
  {
    id: 4,
    name: 'Paneer Tikka',
    category: 'Starters',
    image: 'https://source.unsplash.com/800x600/?paneer-tikka',
    rating: 4.5,
    totalRatings: 134,
    totalOrders: 290,
    revenue: 43500,
    reviews: [
      { id: 7, user: 'Robert M.', rating: 5, comment: 'Perfectly grilled and seasoned!', date: '2024-02-20' },
      { id: 8, user: 'Anna S.', rating: 4, comment: 'Great appetizer choice.', date: '2024-02-19' },
    ],
  },
  {
    id: 5,
    name: 'Gulab Jamun',
    category: 'Desserts',
    image: 'https://source.unsplash.com/800x600/?gulab-jamun',
    rating: 4.9,
    totalRatings: 178,
    totalOrders: 420,
    revenue: 25200,
    reviews: [
      { id: 9, user: 'Tom H.', rating: 5, comment: 'Perfect sweetness and texture!', date: '2024-02-20' },
      { id: 10, user: 'Mary W.', rating: 5, comment: 'Best dessert ever!', date: '2024-02-19' },
    ],
  },
];

const Reports = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTable, setSelectedTable] = useState('all');
  const [expandedTable, setExpandedTable] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTableFilterChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleExpandTable = (tableNumber) => {
    setExpandedTable(expandedTable === tableNumber ? null : tableNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredTableData = selectedTable === 'all'
    ? tableData
    : tableData.filter(table => table.tableNumber === parseInt(selectedTable));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Table Status" />
        <Tab label="Financial Analytics" />
        <Tab label="Order Trends" />
        <Tab label="Popular Dishes" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              select
              label="Filter by Table"
              value={selectedTable}
              onChange={handleTableFilterChange}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="all">All Tables</MenuItem>
              {tableData.map((table) => (
                <MenuItem key={table.tableNumber} value={table.tableNumber}>
                  Table {table.tableNumber}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {filteredTableData.map((table) => (
            <Accordion
              key={table.tableNumber}
              expanded={expandedTable === table.tableNumber}
              onChange={() => handleExpandTable(table.tableNumber)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">
                      Table {table.tableNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Chip
                      label={table.isOccupied ? 'Occupied' : 'Available'}
                      color={table.isOccupied ? 'error' : 'success'}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    {table.currentOrder && (
                      <Typography variant="body2" color="text.secondary">
                        Current Order: ₹{table.currentOrder.total}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {table.currentOrder && (
                      <Chip
                        label={table.currentOrder.status}
                        color={getStatusColor(table.currentOrder.status)}
                        size="small"
                      />
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    {previousOrdersData[table.tableNumber] && (
                      <Tooltip title="Has Previous Orders">
                        <IconButton size="small">
                          <HistoryIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {/* Current Order Details */}
                  {table.currentOrder && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Current Order
                      </Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Items</TableCell>
                              <TableCell>Total</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Time</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{table.currentOrder.items.join(', ')}</TableCell>
                              <TableCell>₹{table.currentOrder.total}</TableCell>
                              <TableCell>
                                <Chip
                                  label={table.currentOrder.status}
                                  color={getStatusColor(table.currentOrder.status)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{table.currentOrder.time}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}

                  {/* Previous Orders */}
                  {previousOrdersData[table.tableNumber] && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Previous Orders
                      </Typography>
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Order ID</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Items</TableCell>
                              <TableCell>Total</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Time</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {previousOrdersData[table.tableNumber].map((order) => (
                              <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.items.join(', ')}</TableCell>
                                <TableCell>₹{order.total}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={order.status}
                                    color={getStatusColor(order.status)}
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell>{order.time}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Revenue
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Revenue by Category
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryRevenue}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {categoryRevenue.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Key Metrics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        ₹28,500
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Today's Revenue
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        85
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Orders Today
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        ₹335
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Order Value
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        70%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Table Occupancy
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Order Trends
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dailyOrders}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#8884d8"
                      name="Number of Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          {/* Top Dishes Overview */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Performing Dishes
                </Typography>
                <Grid container spacing={3}>
                  {popularDishesData.slice(0, 3).map((dish) => (
                    <Grid item xs={12} md={4} key={dish.id}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          component="img"
                          src={dish.image}
                          alt={dish.name}
                          sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: 1,
                            mb: 2,
                          }}
                        />
                        <Typography variant="h6" gutterBottom>
                          {dish.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={dish.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({dish.totalRatings})
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {dish.category}
                        </Typography>
                        <Box sx={{ mt: 'auto' }}>
                          <Typography variant="body2" color="text.secondary">
                            Total Orders: {dish.totalOrders}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Revenue: ₹{dish.revenue.toLocaleString()}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Detailed Dish List */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dish Performance Details
                </Typography>
                <List>
                  {popularDishesData.map((dish) => (
                    <ListItem
                      key={dish.id}
                      alignItems="flex-start"
                      sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:last-child': { borderBottom: 'none' },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={dish.image}
                          alt={dish.name}
                          sx={{ width: 56, height: 56 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1">{dish.name}</Typography>
                            <Chip
                              size="small"
                              label={dish.category}
                              sx={{ ml: 1 }}
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Rating value={dish.rating} precision={0.1} readOnly size="small" />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {dish.rating} ({dish.totalRatings} ratings)
                              </Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Recent Review: "{dish.reviews[0].comment}"
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" color="primary">
                            {dish.totalOrders} Orders
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ₹{dish.revenue.toLocaleString()} Revenue
                          </Typography>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Reviews and Ratings */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Latest Reviews
                </Typography>
                <List>
                  {popularDishesData.flatMap(dish =>
                    dish.reviews.map(review => ({
                      ...review,
                      dishName: dish.name
                    }))
                  ).sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((review) => (
                      <ListItem
                        key={review.id}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          '&:last-child': { borderBottom: 'none' },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="subtitle2">{review.dishName}</Typography>
                              <Rating value={review.rating} size="small" readOnly />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                "{review.comment}"
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                - {review.user} • {review.date}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Reports; 