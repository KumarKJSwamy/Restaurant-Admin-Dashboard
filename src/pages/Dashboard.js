import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
  EventSeat as TableIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  LocalOffer as OfferIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  // Background images for slideshow
  const backgroundImages = [
    'https://media.easemytrip.com/media/Hotel/SHL-240327544189402/RoomImage/RoomImageXtUWbF.jpg',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
    'https://static.vecteezy.com/system/resources/thumbnails/037/200/817/small/ai-generated-generative-ai-busy-chefs-working-on-the-restaurant-kitchen-blurred-background-photo.jpg',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Sample data
  const stats = [
    { title: 'Total Orders', value: '245', icon: <RestaurantIcon />, color: '#1976d2', trend: '+12%' },
    { title: 'Active Tables', value: '18/25', icon: <TableIcon />, color: '#2e7d32', trend: '+5%' },
    { title: 'Total Revenue', value: '₹12,450', icon: <MoneyIcon />, color: '#ed6c02', trend: '+8%' },
    { title: 'Staff On Duty', value: '15/20', icon: <PeopleIcon />, color: '#9c27b0', trend: '+3%' },
  ];

  const recentOrders = [
    { id: 1, customer: 'John Doe', table: 'T12', amount: '₹85.50', status: 'Completed', time: '2 mins ago' },
    { id: 2, customer: 'Sarah Smith', table: 'T05', amount: '₹120.75', status: 'Preparing', time: '5 mins ago' },
    { id: 3, customer: 'Mike Johnson', table: 'T08', amount: '₹65.25', status: 'Pending', time: '10 mins ago' },
    { id: 4, customer: 'Emily Brown', table: 'T03', amount: '₹95.00', status: 'Completed', time: '15 mins ago' },
  ];

  const popularItems = [
    { name: 'Margherita Pizza', orders: 45, revenue: '₹1,125' },
    { name: 'Chicken Pasta', orders: 38, revenue: '₹950' },
    { name: 'Caesar Salad', orders: 32, revenue: '₹640' },
    { name: 'Chocolate Cake', orders: 28, revenue: '₹420' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Hero Section with Slideshow */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-image 1s ease-in-out',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            textAlign: 'center',
            animation: 'fadeIn 1s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          }}
        >
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Welcome to Royal Hotel
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Luxury & Comfort at its Best
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            View Today's Specials
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Chip
                    icon={<TrendingUpIcon />}
                    label={stat.trend}
                    color="success"
                    size="small"
                  />
                </Box>
                <LinearProgress variant="determinate" value={70} sx={{ height: 8, borderRadius: 4 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Orders and Popular Items */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Recent Orders"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <List>
              {recentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem
                    secondaryAction={
                      <Chip
                        label={order.status}
                        color={order.status === 'Completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <RestaurantIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={order.customer}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Table {order.table}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.amount}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Popular Items"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <List>
              {popularItems.map((item) => (
                <React.Fragment key={item.name}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <StarIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Chip
                            icon={<OfferIcon />}
                            label={`${item.orders} orders`}
                            size="small"
                          />
                          <Chip
                            icon={<MoneyIcon />}
                            label={item.revenue}
                            size="small"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" startIcon={<RestaurantIcon />}>
              New Order
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" startIcon={<TableIcon />}>
              Manage Tables
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" startIcon={<PeopleIcon />}>
              Staff Schedule
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" startIcon={<NotificationsIcon />}>
              Notifications
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;