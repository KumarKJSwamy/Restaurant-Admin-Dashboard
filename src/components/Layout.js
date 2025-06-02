import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrderIcon,
  EventSeat as ReservationIcon,
  People as EmployeeIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  RestaurantMenu as RestaurantMenuIcon,
  ListAlt as ListAltIcon,
  TableRestaurant as TableRestaurantIcon,
  Collections as CollectionsIcon,
  Assessment as AssessmentIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  LocalDining as KitchenIcon,
} from '@mui/icons-material';
import AboutUs from '../pages/AboutUs';
import waiterIcon from '../assets/waiter.png';

const drawerWidth = 240;

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Menu Management', icon: <RestaurantMenuIcon />, path: '/menu-management' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Order Management', icon: <ListAltIcon />, path: '/order-management' },
    { text: 'Table Reservation', icon: <TableRestaurantIcon />, path: '/table-reservation' },
    { text: 'Employee Management', icon: <EmployeeIcon />, path: '/employee-management' },
    { text: 'Hotel Gallery', icon: <CollectionsIcon />, path: '/hotel-gallery' },
    { text: 'Kitchen Display', icon: <KitchenIcon />, path: '/kitchen-display' },
    { text: 'About Us', icon: <InfoIcon />, path: '/about-us' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Hotel Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: drawerWidth },
          background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Stack direction="row" alignItems="center" spacing={2}>
            <BusinessIcon sx={{ fontSize: 40, color: 'gold' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                Royal Hotel
              </Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                Luxury & Comfort
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton color="inherit" size="large">
              <img src={waiterIcon} alt="Waiter" style={{ width: 35, height: 35 }} />
            </IconButton>
            <IconButton color="inherit" size="large">
              <SettingsIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', height: 32, my: 'auto' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleProfileMenuOpen}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.light',
                  border: '2px solid white',
                }}
              >
                A
              </Avatar>
              <Box sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
                <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }}>
                  Admin User
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Administrator
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            sx={{
              '& .MuiPaper-root': {
                minWidth: 200,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <AccountIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Profile" 
                secondary="View and edit profile"
              />
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Settings" 
                secondary="System settings"
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                secondary="Sign out of account"
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 