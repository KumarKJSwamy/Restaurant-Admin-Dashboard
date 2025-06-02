import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Button,
  Divider,
  Badge,
} from '@mui/material';
import {
  Timer as TimerIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material';

const KitchenDisplay = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      tableNumber: 'T1',
      items: [
        {
          id: 1,
          name: 'Margherita Pizza',
          quantity: 2,
          status: 'preparing',
          timeElapsed: 5,
          priority: 'high',
          specialInstructions: 'Extra cheese, No onions',
        },
        {
          id: 2,
          name: 'Coca Cola',
          quantity: 3,
          status: 'ready',
          timeElapsed: 2,
          priority: 'normal',
        },
      ],
      timestamp: '12:30 PM',
    },
    // Add more sample orders
  ]);

  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prevOrders =>
        prevOrders.map(order => ({
          ...order,
          items: order.items.map(item => ({
            ...item,
            timeElapsed: item.status === 'preparing' ? item.timeElapsed + 1 : item.timeElapsed,
          })),
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleStatusChange = (orderId, itemId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map(item =>
                item.id === itemId ? { ...item, status: newStatus } : item
              ),
            }
          : order
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'success';
      case 'preparing':
        return 'warning';
      case 'pending':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'normal':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.items.some(item => item.status === activeTab);
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Kitchen Display System
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant={activeTab === 'all' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('all')}
          sx={{ mr: 1 }}
        >
          All Orders
        </Button>
        <Button
          variant={activeTab === 'preparing' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('preparing')}
          sx={{ mr: 1 }}
        >
          Preparing
        </Button>
        <Button
          variant={activeTab === 'ready' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('ready')}
          sx={{ mr: 1 }}
        >
          Ready
        </Button>
        <Button
          variant={activeTab === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} md={6} lg={4} key={order.id}>
            <Card>
              <CardHeader
                title={`Table ${order.tableNumber}`}
                subheader={order.timestamp}
                action={
                  <Chip
                    icon={<TimerIcon />}
                    label={`${Math.max(...order.items.map(item => item.timeElapsed))} min`}
                    color="primary"
                  />
                }
              />
              <CardContent>
                {order.items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1">
                        {item.name} x {item.quantity}
                      </Typography>
                      <Box>
                        {item.priority === 'high' && (
                          <IconButton size="small" color="error">
                            <FireIcon />
                          </IconButton>
                        )}
                        <Chip
                          label={item.status}
                          color={getStatusColor(item.status)}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </Box>
                    {item.specialInstructions && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.specialInstructions}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CheckIcon />}
                        onClick={() => handleStatusChange(order.id, item.id, 'ready')}
                        disabled={item.status === 'ready'}
                      >
                        Mark Ready
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<WarningIcon />}
                        onClick={() => handleStatusChange(order.id, item.id, 'pending')}
                        disabled={item.status === 'pending'}
                      >
                        Mark Pending
                      </Button>
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KitchenDisplay; 