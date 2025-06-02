import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  IconButton,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  CheckCircle as CheckCircleIcon,
  Timer as TimerIcon,
  LocalDining as FoodIcon,
  Restaurant as RestaurantIcon,
  Kitchen as KitchenIcon,
  Assignment as OrderIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const KitchenDisplaySystem = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    status: 'active',
  });

  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@restaurant.com',
      role: 'Chef',
      status: 'active',
      avatar: 'JD',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@restaurant.com',
      role: 'Sous Chef',
      status: 'active',
      avatar: 'SS',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@restaurant.com',
      role: 'Line Cook',
      status: 'inactive',
      avatar: 'MJ',
    },
  ]);

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: 1,
      table: 'T12',
      items: [
        { id: 1, name: 'Butter Chicken', quantity: 2, status: 'preparing', time: '5 mins ago' },
        { id: 2, name: 'Garlic Naan', quantity: 4, status: 'ready', time: '2 mins ago' },
      ],
      status: 'in-progress',
      time: '10 mins ago',
    },
    {
      id: 2,
      table: 'T05',
      items: [
        { id: 3, name: 'Biryani', quantity: 1, status: 'pending', time: '3 mins ago' },
        { id: 4, name: 'Raita', quantity: 1, status: 'ready', time: '1 min ago' },
      ],
      status: 'pending',
      time: '3 mins ago',
    },
    {
      id: 3,
      table: 'T08',
      items: [
        { id: 5, name: 'Masala Dosa', quantity: 2, status: 'preparing', time: '7 mins ago' },
        { id: 6, name: 'Sambar', quantity: 2, status: 'ready', time: '2 mins ago' },
      ],
      status: 'in-progress',
      time: '7 mins ago',
    },
    {
      id: 4,
      table: 'T03',
      items: [
        { id: 7, name: 'Palak Paneer', quantity: 1, status: 'ready', time: '1 min ago' },
        { id: 8, name: 'Butter Naan', quantity: 2, status: 'ready', time: '1 min ago' },
      ],
      status: 'ready',
      time: '8 mins ago',
    },
  ]);

  const handleStatusChange = (orderId, itemId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => {
            if (item.id === itemId) {
              return { ...item, status: newStatus };
            }
            return item;
          }),
          status: newStatus === 'ready' && order.items.every(i => i.status === 'ready') ? 'ready' : 'in-progress'
        };
      }
      return order;
    }));
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return <CheckCircleIcon />;
      case 'preparing':
        return <TimerIcon />;
      case 'pending':
        return <OrderIcon />;
      default:
        return <FoodIcon />;
    }
  };

  const handleOpenUserDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setUserForm(user);
    } else {
      setSelectedUser(null);
      setUserForm({
        name: '',
        email: '',
        role: '',
        password: '',
        status: 'active',
      });
    }
    setUserDialogOpen(true);
  };

  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserSubmit = () => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...userForm, id: user.id } : user
        )
      );
    } else {
      const newUser = {
        ...userForm,
        id: Date.now(),
        avatar: userForm.name
          .split(' ')
          .map((n) => n[0])
          .join(''),
      };
      setUsers((prev) => [...prev, newUser]);
    }
    handleCloseUserDialog();
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const userColumns = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      renderCell: (params) => (
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {params.value}
        </Avatar>
      ),
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'active' ? 'success' : 'error'}
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
          <IconButton onClick={() => handleOpenUserDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Kitchen Display System
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={() => handleOpenUserDialog()}
            sx={{ mr: 2 }}
          >
            Manage Users
          </Button>
          <Chip
            icon={<KitchenIcon />}
            label="Kitchen 1"
            color="primary"
            sx={{ mr: 1 }}
          />
          <Chip
            icon={<RestaurantIcon />}
            label="Main Kitchen"
            color="secondary"
          />
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          <Tab label="All Orders" />
          <Tab label="Pending" />
          <Tab label="In Progress" />
          <Tab label="Ready" />
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Table {order.table}
                </Typography>
                <Chip
                  icon={getStatusIcon(order.status)}
                  label={order.status}
                  color={getStatusColor(order.status)}
                />
              </Box>
              <List>
                {order.items.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1">
                              {item.quantity}x {item.name}
                            </Typography>
                            <Chip
                              size="small"
                              label={item.time}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleStatusChange(order.id, item.id, 'ready')}
                          disabled={item.status === 'ready'}
                        >
                          <Badge
                            color={getStatusColor(item.status)}
                            variant="dot"
                            invisible={item.status === 'ready'}
                          >
                            <FoodIcon />
                          </Badge>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  disabled={order.status !== 'ready'}
                >
                  Complete Order
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* User Management Dialog */}
      <Dialog open={userDialogOpen} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userForm.name}
                onChange={handleUserInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleUserInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={userForm.role}
                onChange={handleUserInputChange}
                required
              />
            </Grid>
            {!selectedUser && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={userForm.password}
                  onChange={handleUserInputChange}
                  required
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={userForm.status}
                onChange={handleUserInputChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancel</Button>
          <Button onClick={handleUserSubmit} variant="contained">
            {selectedUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Management Grid */}
      {userDialogOpen && (
        <Box sx={{ mt: 3 }}>
          <DataGrid
            rows={users}
            columns={userColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            sx={{
              '& .MuiDataGrid-cell': {
                py: 1,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default KitchenDisplaySystem; 