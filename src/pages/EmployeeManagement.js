import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Paper,
  Typography,
  IconButton,
  MenuItem,
  Chip,
  Avatar,
  Tooltip,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Rating,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  CameraAlt as CameraIcon,
  Restaurant as RestaurantIcon,
  MeetingRoom as MeetingRoomIcon,
  Event as EventIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const roles = [
  { value: 'manager', label: 'Manager' },
  { value: 'chef', label: 'Chef' },
  { value: 'waiter', label: 'Waiter' },
  { value: 'cashier', label: 'Cashier' },
  { value: 'cleaner', label: 'Cleaner' },
];

const initialEmployee = {
  id: '',
  name: '',
  email: '',
  phone: '',
  role: '',
  salary: '',
  joiningDate: '',
  address: '',
  status: 'active',
  lastSalaryPaid: '',
  salaryStatus: 'pending',
  profileImage: '',
};

// Sample performance data
const employeePerformanceData = {
  chefs: [
    {
      id: 1,
      name: 'Chef Rahul Kumar',
      role: 'Head Chef',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.8,
      speciality: 'Indian Cuisine',
      dishesRating: 4.9,
      ordersCompleted: 450,
      averagePreparationTime: 22,
      customerComplaints: 2,
      attendance: 98,
      skillSet: [
        { skill: 'Cooking', score: 95 },
        { skill: 'Menu Planning', score: 90 },
        { skill: 'Team Management', score: 85 },
        { skill: 'Food Presentation', score: 92 },
        { skill: 'Inventory Management', score: 88 },
      ],
    },
    {
      id: 2,
      name: 'Chef Priya Singh',
      role: 'Sous Chef',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.7,
      speciality: 'Continental',
      dishesRating: 4.8,
      ordersCompleted: 380,
      averagePreparationTime: 25,
      customerComplaints: 3,
      attendance: 95,
      skillSet: [
        { skill: 'Cooking', score: 92 },
        { skill: 'Menu Planning', score: 85 },
        { skill: 'Team Management', score: 80 },
        { skill: 'Food Presentation', score: 90 },
        { skill: 'Inventory Management', score: 85 },
      ],
    },
  ],
  waiters: [
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Senior Waiter',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 4.6,
      tablesServed: 580,
      averageServiceTime: 12,
      customerFeedback: 4.7,
      orderAccuracy: 98,
      attendance: 96,
      skillSet: [
        { skill: 'Customer Service', score: 92 },
        { skill: 'Order Management', score: 88 },
        { skill: 'Communication', score: 90 },
        { skill: 'Problem Solving', score: 85 },
        { skill: 'Teamwork', score: 89 },
      ],
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'Waiter',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 4.5,
      tablesServed: 420,
      averageServiceTime: 15,
      customerFeedback: 4.6,
      orderAccuracy: 96,
      attendance: 94,
      skillSet: [
        { skill: 'Customer Service', score: 90 },
        { skill: 'Order Management', score: 85 },
        { skill: 'Communication', score: 88 },
        { skill: 'Problem Solving', score: 82 },
        { skill: 'Teamwork', score: 87 },
      ],
    },
  ],
};

const monthlyPerformance = [
  { month: 'Jan', chefs: 92, waiters: 88 },
  { month: 'Feb', chefs: 88, waiters: 90 },
  { month: 'Mar', chefs: 95, waiters: 87 },
  { month: 'Apr', chefs: 90, waiters: 89 },
  { month: 'May', chefs: 93, waiters: 91 },
  { month: 'Jun', chefs: 91, waiters: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const monthlyPerformanceData = [
  { month: 'Jan', chefs: 85, waiters: 78 },
  { month: 'Feb', chefs: 88, waiters: 82 },
  { month: 'Mar', chefs: 87, waiters: 85 },
  { month: 'Apr', chefs: 89, waiters: 84 },
  { month: 'May', chefs: 86, waiters: 87 },
  { month: 'Jun', chefs: 90, waiters: 88 },
];

const chefPerformanceData = [
  { skill: 'Food Quality', value: 90 },
  { skill: 'Speed', value: 85 },
  { skill: 'Cleanliness', value: 95 },
  { skill: 'Menu Knowledge', value: 88 },
  { skill: 'Team Coordination', value: 92 },
];

const waiterPerformanceData = [
  { skill: 'Customer Service', value: 88 },
  { skill: 'Order Accuracy', value: 92 },
  { skill: 'Speed', value: 85 },
  { skill: 'Menu Knowledge', value: 80 },
  { skill: 'Team Coordination', value: 87 },
];

const PerformanceCard = ({ title, value, description }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const EmployeePerformance = () => {
  const [roleTab, setRoleTab] = useState(0);

  const handleRoleTabChange = (event, newValue) => {
    setRoleTab(newValue);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <PerformanceCard
            title="Average Rating"
            value={4.5}
            description="Overall employee performance"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <PerformanceCard
            title="Active Employees"
            value="15"
            description="Currently working"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <PerformanceCard
            title="Orders Completed"
            value="2,450"
            description="Last 30 days"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <PerformanceCard
            title="Customer Satisfaction"
            value="92%"
            description="Based on feedback"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Performance Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="chefs"
                  stroke="#8884d8"
                  name="Chefs"
                />
                <Line
                  type="monotone"
                  dataKey="waiters"
                  stroke="#82ca9d"
                  name="Waiters"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ mt: 3 }}>
            <Tabs value={roleTab} onChange={handleRoleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tab label="All Roles" />
              <Tab label="Chefs" />
              <Tab label="Waiters" />
            </Tabs>
            <Box sx={{ p: 3 }}>
              {roleTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Chef Performance Metrics
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={chefPerformanceData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Chefs"
                          dataKey="value"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Waiter Performance Metrics
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={waiterPerformanceData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Waiters"
                          dataKey="value"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>
              )}
              {roleTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Chef Performance Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Top Performing Chefs
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            {['Priya Sharma', 'Vikram Singh'].map((name, index) => (
                              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ mr: 2 }}>
                                  {name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1">
                                    {name}
                                  </Typography>
                                  <Rating value={4.5} readOnly size="small" />
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={chefPerformanceData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Skills"
                            dataKey="value"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {roleTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Waiter Performance Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Top Performing Waiters
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            {['Amit Patel'].map((name, index) => (
                              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ mr: 2 }}>
                                  {name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1">
                                    {name}
                                  </Typography>
                                  <Rating value={4.5} readOnly size="small" />
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={waiterPerformanceData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Skills"
                            dataKey="value"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '9876543210',
      role: 'manager',
      salary: 75000,
      joiningDate: '2023-01-15',
      address: '123 MG Road, Bangalore',
      status: 'active',
      lastSalaryPaid: '2024-02-01',
      salaryStatus: 'paid',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '9876543211',
      role: 'chef',
      salary: 55000,
      joiningDate: '2023-02-20',
      address: '456 Park Street, Mumbai',
      status: 'active',
      lastSalaryPaid: '2024-02-01',
      salaryStatus: 'paid',
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      phone: '9876543212',
      role: 'waiter',
      salary: 25000,
      joiningDate: '2023-03-10',
      address: '789 Gandhi Nagar, Delhi',
      status: 'active',
      lastSalaryPaid: '2024-01-01',
      salaryStatus: 'pending',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      phone: '9876543213',
      role: 'cashier',
      salary: 30000,
      joiningDate: '2023-04-05',
      address: '321 Brigade Road, Bangalore',
      status: 'active',
      lastSalaryPaid: '2024-02-01',
      salaryStatus: 'paid',
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '9876543214',
      role: 'chef',
      salary: 45000,
      joiningDate: '2023-05-15',
      address: '654 Marine Drive, Mumbai',
      status: 'active',
      lastSalaryPaid: '2024-01-01',
      salaryStatus: 'pending',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(initialEmployee);
  const [viewMode, setViewMode] = useState(false);

  const handleOpen = (employee = null, mode = 'view') => {
    if (employee) {
      setSelectedEmployee({...employee});
      setViewMode(mode === 'view');
    } else {
      setSelectedEmployee(initialEmployee);
      setViewMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(initialEmployee);
    setViewMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'role', 'salary', 'joiningDate', 'address'];
    const missingFields = requiredFields.filter(field => !selectedEmployee[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      // Prepare the employee data
      const employeeData = {
        ...selectedEmployee,
        salary: Number(selectedEmployee.salary),
        status: selectedEmployee.status || 'active',
        salaryStatus: selectedEmployee.salaryStatus || 'pending',
        lastSalaryPaid: selectedEmployee.lastSalaryPaid || new Date().toISOString().split('T')[0]
      };

      if (selectedEmployee.id) {
        // Update existing employee
        const updatedEmployees = employees.map(emp => 
          emp.id === selectedEmployee.id ? employeeData : emp
        );
        setEmployees(updatedEmployees);
        toast.success('Employee updated successfully');
      } else {
        // Add new employee
        const newEmployee = {
          ...employeeData,
          id: Math.max(...employees.map(emp => emp.id), 0) + 1,
          profileImage: employeeData.profileImage || `https://randomuser.me/api/portraits/${employeeData.name.toLowerCase().includes('mr.') ? 'men' : 'women'}/${Math.floor(Math.random() * 10)}.jpg`,
        };
        setEmployees([...employees, newEmployee]);
        toast.success('Employee added successfully');
      }
      handleClose();
    } catch (error) {
      toast.error('Error saving employee: ' + error.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      toast.success('Employee deleted successfully');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedEmployee({
          ...selectedEmployee,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ mr: 2 }}
            src={params.row.profileImage}
            alt={params.row.name}
          >
            {params.row.name.charAt(0)}
          </Avatar>
          {params.row.name}
        </Box>
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.role}
          color={
            params.row.role === 'manager' ? 'primary' :
            params.row.role === 'chef' ? 'secondary' :
            params.row.role === 'waiter' ? 'info' :
            params.row.role === 'cashier' ? 'success' :
            'default'
          }
          size="small"
        />
      ),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 130,
      valueFormatter: (params) => `₹${params.value.toLocaleString()}`,
    },
    {
      field: 'salaryStatus',
      headerName: 'Salary Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.salaryStatus}
          color={params.row.salaryStatus === 'paid' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'lastSalaryPaid',
      headerName: 'Last Paid',
      width: 130,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'joiningDate',
      headerName: 'Joining Date',
      width: 130,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === 'active' ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View"
          onClick={() => handleOpen(params.row, 'view')}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleOpen(params.row, 'edit')}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen(null, 'add')}
        >
          Add Employee
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Paper>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>
          {viewMode ? 'Employee Details' : selectedEmployee.id ? 'Edit Employee' : 'Add Employee'}
        </DialogTitle>
        <DialogContent>
          {viewMode ? (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
                      image={selectedEmployee.profileImage || 'https://via.placeholder.com/300'}
                      alt={selectedEmployee.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    {!viewMode && (
                      <Box sx={{ p: 2, textAlign: 'center' }}>
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="profile-image-upload"
                          type="file"
                          onChange={handleImageChange}
                        />
                        <label htmlFor="profile-image-upload">
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CameraIcon />}
                          >
                            Change Photo
                          </Button>
                        </label>
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {selectedEmployee.name}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {selectedEmployee.role}
                      </Typography>
                      <Chip
                        label={selectedEmployee.status}
                        color={selectedEmployee.status === 'active' ? 'success' : 'error'}
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Contact Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {selectedEmployee.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        {selectedEmployee.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        Address
                      </Typography>
                      <Typography variant="body1">
                        {selectedEmployee.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
                        Employment Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Salary
                      </Typography>
                      <Typography variant="body1">
                        ₹{selectedEmployee.salary?.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Joining Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedEmployee.joiningDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Last Salary Paid
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedEmployee.lastSalaryPaid).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Salary Status
                      </Typography>
                      <Chip
                        label={selectedEmployee.salaryStatus}
                        color={selectedEmployee.salaryStatus === 'paid' ? 'success' : 'warning'}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{ width: 100, height: 100, mr: 2 }}
                      src={selectedEmployee.profileImage}
                      alt={selectedEmployee.name}
                    >
                      {selectedEmployee.name ? selectedEmployee.name.charAt(0) : <PersonIcon />}
                    </Avatar>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="profile-image-upload"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="profile-image-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CameraIcon />}
                      >
                        Upload Photo
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={selectedEmployee.name || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                    disabled={viewMode}
                    required
                    error={!selectedEmployee.name}
                    helperText={!selectedEmployee.name && 'Name is required'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={selectedEmployee.email || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                    disabled={viewMode}
                    required
                    error={!selectedEmployee.email}
                    helperText={!selectedEmployee.email && 'Email is required'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={selectedEmployee.phone || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })}
                    disabled={viewMode}
                    required
                    error={!selectedEmployee.phone}
                    helperText={!selectedEmployee.phone && 'Phone is required'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    value={selectedEmployee.role || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, role: e.target.value })}
                    disabled={viewMode}
                    required
                    error={!selectedEmployee.role}
                    helperText={!selectedEmployee.role && 'Role is required'}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Salary"
                    type="number"
                    value={selectedEmployee.salary || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })}
                    disabled={viewMode}
                    required
                    error={!selectedEmployee.salary}
                    helperText={!selectedEmployee.salary && 'Salary is required'}
                    InputProps={{
                      startAdornment: <span style={{ marginRight: 8 }}>₹</span>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    type="date"
                    value={selectedEmployee.joiningDate || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, joiningDate: e.target.value })}
                    disabled={viewMode}
                    required
                    error={!selectedEmployee.joiningDate}
                    helperText={!selectedEmployee.joiningDate && 'Joining date is required'}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    value={selectedEmployee.address || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: e.target.value })}
                    disabled={viewMode}
                    required
                    error={!selectedEmployee.address}
                    helperText={!selectedEmployee.address && 'Address is required'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Salary Paid"
                    type="date"
                    value={selectedEmployee.lastSalaryPaid || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, lastSalaryPaid: e.target.value })}
                    disabled={viewMode}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Salary Status"
                    value={selectedEmployee.salaryStatus || 'pending'}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salaryStatus: e.target.value })}
                    disabled={viewMode}
                  >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    value={selectedEmployee.status || 'active'}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, status: e.target.value })}
                    disabled={viewMode}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {viewMode ? 'Close' : 'Cancel'}
          </Button>
          {!viewMode && (
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
            >
              {selectedEmployee.id ? 'Update' : 'Add'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const EmployeeManagement = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Employee List" />
          <Tab label="Performance Dashboard" />
        </Tabs>
      </Box>

      {currentTab === 0 && <EmployeeList />}
      {currentTab === 1 && <EmployeePerformance />}
    </Box>
  );
};

export default EmployeeManagement; 