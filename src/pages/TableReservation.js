import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Avatar,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Group as GroupIcon,
  TableBar as TableIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { format } from 'date-fns';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const TableReservation = () => {
  const eventTypes = [
    { type: 'Birthday', charge: 2000 },
    { type: 'Business Meeting', charge: 3000 },
    { type: 'Family Gathering', charge: 2500 },
    { type: 'Anniversary', charge: 3500 },
    { type: 'Regular Dining', charge: 0 },
  ];

  const [reservations, setReservations] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com',
      tableNumber: 'T1',
      guests: 4,
      date: '2024-03-15T19:00:00',
      status: 'confirmed',
      specialRequests: 'Window seat preferred',
      eventType: 'Birthday',
      charge: 2000,
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      phone: '987-654-3210',
      email: 'jane@example.com',
      tableNumber: 'T3',
      guests: 2,
      date: '2024-03-16T20:00:00',
      status: 'pending',
      specialRequests: 'Birthday celebration',
      eventType: 'Business Meeting',
      charge: 3000,
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      phone: '555-555-5555',
      email: 'mike@example.com',
      tableNumber: 'T5',
      guests: 6,
      date: '2024-03-15T18:30:00',
      status: 'confirmed',
      specialRequests: 'Allergic to nuts',
      eventType: 'Family Gathering',
      charge: 2500,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    tableNumber: '',
    guests: '',
    date: new Date(),
    status: 'pending',
    specialRequests: '',
    eventType: 'Regular Dining',
    charge: 0,
  });

  const tables = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
  const maxGuests = 8;

  const getReservationStats = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    return {
      total: reservations.length,
      today: reservations.filter(r => r.date.startsWith(todayStr)).length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      pending: reservations.filter(r => r.status === 'pending').length,
    };
  };

  const stats = getReservationStats();

  const handleOpenDialog = (reservation = null) => {
    if (reservation) {
      setSelectedReservation(reservation);
      setFormData({
        ...reservation,
        date: new Date(reservation.date),
      });
    } else {
      setSelectedReservation(null);
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        tableNumber: '',
        guests: '',
        date: new Date(),
        status: 'pending',
        specialRequests: '',
        eventType: 'Regular Dining',
        charge: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReservation(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'eventType') {
      const selectedEvent = eventTypes.find(event => event.type === value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        charge: selectedEvent ? selectedEvent.charge : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSubmit = () => {
    if (selectedReservation) {
      // Update existing reservation
      setReservations((prev) =>
        prev.map((res) =>
          res.id === selectedReservation.id
            ? { ...formData, id: res.id }
            : res
        )
      );
    } else {
      // Add new reservation
      const newReservation = {
        ...formData,
        id: Date.now(),
        date: formData.date.toISOString(),
      };
      setReservations((prev) => [...prev, newReservation]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const isTableAvailable = (tableNumber, date) => {
    const reservationTime = new Date(date);
    return !reservations.some(
      (res) =>
        res.tableNumber === tableNumber &&
        res.status !== 'cancelled' &&
        Math.abs(new Date(res.date) - reservationTime) < 7200000 // 2 hours in milliseconds
    );
  };

  const columns = [
    {
      field: 'customerName',
      headerName: 'Customer',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
            {params.value.charAt(0)}
          </Avatar>
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    { field: 'phone', headerName: 'Phone', width: 130 },
    {
      field: 'tableNumber',
      headerName: 'Table',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={<TableIcon />}
          label={params.value}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'guests',
      headerName: 'Guests',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <GroupIcon fontSize="small" />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'date',
      headerName: 'Date & Time',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon fontSize="small" />
          <Typography>
            {format(new Date(params.value), 'MMM dd, yyyy HH:mm')}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={params.value}
            color={getStatusColor(params.value)}
            size="small"
          />
          {params.value === 'pending' && (
            <Tooltip title="Confirm Reservation">
              <IconButton
                size="small"
                color="success"
                onClick={() => handleStatusChange(params.row.id, 'confirmed')}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
    {
      field: 'eventType',
      headerName: 'Event Type',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'charge',
      headerName: 'Charges (₹)',
      width: 130,
      renderCell: (params) => (
        <Typography>
          ₹{params.value.toLocaleString('en-IN')}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Edit Reservation">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenDialog(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel Reservation">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleStatusChange(params.row.id, 'cancelled')}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        {/* Header with Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RestaurantIcon fontSize="large" />
                Table Reservations
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ borderRadius: 2 }}
              >
                New Reservation
              </Button>
            </Box>
          </Grid>
          
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Total Reservations</Typography>
                <Typography variant="h3">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Today's Reservations</Typography>
                <Typography variant="h3">{stats.today}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Confirmed</Typography>
                <Typography variant="h3">{stats.confirmed}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h3">{stats.pending}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Table Layout */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TableIcon />
                Table Layout
              </Typography>
              <Grid container spacing={2}>
                {tables.map((table) => {
                  const reservation = reservations.find(
                    (r) => r.tableNumber === table && r.status !== 'cancelled'
                  );
                  return (
                    <Grid item xs={6} sm={4} md={3} key={table}>
                      <Card
                        sx={{
                          bgcolor: reservation ? 'error.light' : 'success.light',
                          position: 'relative',
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6">{table}</Typography>
                          {reservation && (
                            <Typography variant="body2">
                              Reserved: {format(new Date(reservation.date), 'HH:mm')}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Reservations Table */}
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={reservations}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
              },
              '& .MuiDataGrid-row:hover': {
                bgcolor: 'action.hover',
              },
            }}
          />
        </Paper>

        {/* Reservation Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedReservation ? 'Edit Reservation' : 'New Reservation'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Table Number</InputLabel>
                  <Select
                    name="tableNumber"
                    value={formData.tableNumber}
                    onChange={handleInputChange}
                    label="Table Number"
                  >
                    {tables.map((table) => (
                      <MenuItem
                        key={table}
                        value={table}
                        disabled={
                          !isTableAvailable(table, formData.date) &&
                          (!selectedReservation || selectedReservation.tableNumber !== table)
                        }
                      >
                        {table}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Number of Guests</InputLabel>
                  <Select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    label="Number of Guests"
                  >
                    {[...Array(maxGuests)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Reservation Date & Time"
                    value={formData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Special Requests"
                  name="specialRequests"
                  multiline
                  rows={3}
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    label="Event Type"
                  >
                    {eventTypes.map((event) => (
                      <MenuItem key={event.type} value={event.type}>
                        {event.type} {event.charge > 0 ? `(₹${event.charge})` : ''}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Charges (₹)"
                  value={formData.charge}
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText="Charges are based on event type"
                />
              </Grid>
              {selectedReservation && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      label="Status"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              {selectedReservation ? 'Update' : 'Create'} Reservation
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default TableReservation; 