import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Avatar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  LocalDining as FoodIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  CallSplit as SplitIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customerName: 'John Doe',
      tableNumber: 'T1',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Vanilla Ice Cream', quantity: 2, price: 40.00 },
      ],
      total: 92.99,
      status: 'completed',
      timestamp: '2024-02-15 12:30',
      customer: {
        name: 'John Doe',
        preferences: ['No onions', 'Extra cheese'],
        loyaltyPoints: 150,
      },
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customerName: 'Sarah Wilson',
      tableNumber: 'T3',
      items: [
        { name: 'Idly', quantity: 2, price: 30.00 },
        { name: 'Dosa', quantity: 1, price: 40.00 },
      ],
      total: 100.00,
      status: 'ready',
      timestamp: '2024-02-15 12:45',
      customer: {
        name: 'Sarah Wilson',
        preferences: ['Extra spicy'],
        loyaltyPoints: 100,
      },
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customerName: 'Mike Johnson',
      tableNumber: 'T2',
      items: [
        { name: 'North Indian Thali', quantity: 2, price: 150.00 },
        { name: 'Butterscotch Ice Cream', quantity: 2, price: 45.00 },
      ],
      total: 390.00,
      status: 'preparing',
      timestamp: '2024-02-15 13:00',
      customer: {
        name: 'Mike Johnson',
        preferences: ['No onions'],
        loyaltyPoints: 75,
      },
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customerName: 'Emily Brown',
      tableNumber: 'T4',
      items: [
        { name: 'South Indian Meals', quantity: 1, price: 120.00 },
        { name: 'Lemon Rice', quantity: 1, price: 60.00 },
        { name: 'Strawberry Ice Cream', quantity: 2, price: 45.00 },
      ],
      total: 270.00,
      status: 'pending',
      timestamp: '2024-02-15 13:15',
      customer: {
        name: 'Emily Brown',
        preferences: ['Extra sugar'],
        loyaltyPoints: 50,
      },
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customerName: 'David Lee',
      tableNumber: 'T6',
      items: [
        { name: 'Veg Biriyani', quantity: 2, price: 130.00 },
        { name: 'Poori', quantity: 1, price: 50.00 },
      ],
      total: 310.00,
      status: 'preparing',
      timestamp: '2024-02-15 13:30',
      customer: {
        name: 'David Lee',
        preferences: ['No onions'],
        loyaltyPoints: 100,
      },
    },
    {
      id: 6,
      orderNumber: 'ORD-006',
      customerName: 'Lisa Anderson',
      tableNumber: 'T5',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
        { name: 'Vanilla Ice Cream', quantity: 1, price: 40.00 },
        { name: 'Butterscotch Ice Cream', quantity: 1, price: 45.00 },
      ],
      total: 110.98,
      status: 'pending',
      timestamp: '2024-02-15 13:45',
      customer: {
        name: 'Lisa Anderson',
        preferences: ['Extra sugar'],
        loyaltyPoints: 75,
      },
    },
    {
      id: 7,
      orderNumber: 'ORD-007',
      customerName: 'Robert Wilson',
      tableNumber: 'T7',
      items: [
        { name: 'South Indian Meals', quantity: 2, price: 120.00 },
        { name: 'Strawberry Ice Cream', quantity: 2, price: 45.00 },
      ],
      total: 330.00,
      status: 'ready',
      timestamp: '2024-02-15 14:00',
      customer: {
        name: 'Robert Wilson',
        preferences: ['Extra spicy'],
        loyaltyPoints: 100,
      },
    },
    {
      id: 8,
      orderNumber: 'ORD-008',
      customerName: 'Jennifer Taylor',
      tableNumber: 'T8',
      items: [
        { name: 'Idly', quantity: 3, price: 30.00 },
        { name: 'Dosa', quantity: 2, price: 40.00 },
        { name: 'Butterscotch Ice Cream', quantity: 1, price: 45.00 },
      ],
      total: 185.00,
      status: 'pending',
      timestamp: '2024-02-15 14:15',
      customer: {
        name: 'Jennifer Taylor',
        preferences: ['No onions'],
        loyaltyPoints: 50,
      },
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [splitBillDialog, setSplitBillDialog] = useState(false);
  const [splitType, setSplitType] = useState('equal');
  const [customSplit, setCustomSplit] = useState([]);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'preparing':
        return 'info';
      case 'ready':
        return 'success';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleSplitBill = (order) => {
    setSelectedOrder(order);
    setSplitBillDialog(true);
  };

  const handleSplitBillClose = () => {
    setSplitBillDialog(false);
    setSelectedOrder(null);
    setSplitType('equal');
    setCustomSplit([]);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSplitBillConfirm = () => {
    // Implement split bill logic here
    handleSplitBillClose();
  };

  const columns = [
    { field: 'orderNumber', headerName: 'Order #', width: 130 },
    { field: 'customerName', headerName: 'Customer', width: 150 },
    { field: 'tableNumber', headerName: 'Table', width: 100 },
    { 
      field: 'total', 
      headerName: 'Total', 
      width: 130,
      renderCell: (params) => (
        <Typography>₹{params.value.toFixed(2)}</Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Time',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpenDialog(params.row)}
            startIcon={<FoodIcon />}
          >
            View Details
          </Button>
          <FormControl size="small" sx={{ ml: 1, minWidth: 120 }}>
            <Select
              value={params.row.status}
              onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="ready">Ready</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            color="primary"
            onClick={() => handleSplitBill(params.row)}
            title="Split Bill"
          >
            <SplitIcon />
          </IconButton>
          <IconButton color="primary" title="Process Payment">
            <PaymentIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Calculate total orders by status
  const orderStats = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const renderSplitBillDialog = () => (
    <Dialog open={splitBillDialog} onClose={handleSplitBillClose} maxWidth="md" fullWidth>
      <DialogTitle>Split Bill</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Split Type</InputLabel>
            <Select
              value={splitType}
              onChange={(e) => setSplitType(e.target.value)}
              label="Split Type"
            >
              <MenuItem value="equal">Equal Split</MenuItem>
              <MenuItem value="custom">Custom Split</MenuItem>
              <MenuItem value="items">Split by Items</MenuItem>
            </Select>
          </FormControl>

          {splitType === 'equal' && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Total Amount: ${calculateTotal(selectedOrder?.items || [])}
              </Typography>
              <TextField
                fullWidth
                type="number"
                label="Number of People"
                defaultValue={2}
                sx={{ mt: 2 }}
              />
            </Box>
          )}

          {splitType === 'custom' && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Enter amounts for each person
              </Typography>
              {[1, 2].map((person) => (
                <TextField
                  key={person}
                  fullWidth
                  type="number"
                  label={`Person ${person} Amount`}
                  sx={{ mt: 2 }}
                />
              ))}
            </Box>
          )}

          {splitType === 'items' && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Select items for each person
              </Typography>
              {selectedOrder?.items.map((item) => (
                <Box key={item.id} sx={{ mt: 2 }}>
                  <Typography>{item.name}</Typography>
                  <Select
                    fullWidth
                    value={1}
                    onChange={() => {}}
                  >
                    <MenuItem value={1}>Person 1</MenuItem>
                    <MenuItem value={2}>Person 2</MenuItem>
                  </Select>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSplitBillClose}>Cancel</Button>
        <Button onClick={handleSplitBillConfirm} variant="contained" color="primary">
          Split Bill
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Order Management
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Orders
              </Typography>
              <Typography variant="h4">
                {orderStats.pending || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Preparing
              </Typography>
              <Typography variant="h4">
                {orderStats.preparing || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Ready for Pickup
              </Typography>
              <Typography variant="h4">
                {orderStats.ready || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h4">
                {orderStats.completed || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        disableSelectionOnClick
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              Order Details - {selectedOrder.orderNumber}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Customer: {selectedOrder.customerName}
                  </Typography>
                  <Typography variant="subtitle1">
                    Table: {selectedOrder.tableNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    Time: {selectedOrder.timestamp}
                  </Typography>
                  <Chip
                    label={selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    color={getStatusColor(selectedOrder.status)}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">Order Items</Typography>
                  <List>
                    {selectedOrder.items.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item.name}
                          secondary={`Quantity: ${item.quantity} - ₹${(
                            item.price * item.quantity
                          ).toFixed(2)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">
                    Total: ₹{selectedOrder.total.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                color={getStatusColor(selectedOrder.status)}
                startIcon={<CheckIcon />}
                onClick={() => {
                  const nextStatus = {
                    pending: 'preparing',
                    preparing: 'ready',
                    ready: 'completed',
                    completed: 'completed',
                  }[selectedOrder.status];
                  handleStatusChange(selectedOrder.id, nextStatus);
                }}
                disabled={selectedOrder.status === 'completed'}
              >
                {selectedOrder.status === 'completed' ? 'Completed' : 'Mark as ' + 
                  {
                    pending: 'Preparing',
                    preparing: 'Ready',
                    ready: 'Completed',
                  }[selectedOrder.status]
                }
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {renderSplitBillDialog()}
    </Box>
  );
};

export default OrderManagement; 