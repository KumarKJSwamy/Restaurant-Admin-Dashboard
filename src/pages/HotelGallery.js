import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
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
  Paper,
  Tooltip,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Category as CategoryIcon,
  Close as CloseIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const defaultAmenities = [
  {
    id: '1',
    title: 'Luxury Suites',
    description: 'Elegantly furnished suites with premium amenities, king-size beds, and city views. Features include mini-bar, smart TV, and jacuzzi.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format',
    icon: 'bed-outline',
    category: 'Accommodation'
  },
  {
    id: '2',
    title: 'Grand Ballroom',
    description: 'Spectacular venue for weddings and events with crystal chandeliers, state-of-the-art AV equipment, and capacity for 500 guests.',
    image: 'https://theoterra.com/wp-content/uploads/2024/08/Grandballroom-02.jpg',
    icon: 'business-outline',
    category: 'Events'
  },
  {
    id: '3',
    title: 'Infinity Pool',
    description: 'Temperature-controlled rooftop infinity pool with panoramic city views. Features poolside bar and luxury cabanas.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&auto=format',
    icon: 'water-outline',
    category: 'Recreation'
  },
  {
    id: '4',
    title: 'Wellness Spa',
    description: 'Luxurious spa offering traditional and modern treatments, featuring steam rooms, sauna, and meditation spaces.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format',
    icon: 'spa-outline',
    category: 'Wellness'
  },
  {
    id: '5',
    title: 'Fitness Center',
    description: 'State-of-the-art gym with cardio equipment, free weights, and personal training services. Open 24/7 for guests.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format',
    icon: 'barbell-outline',
    category: 'Wellness'
  },
  {
    id: '6',
    title: 'Kids Zone',
    description: 'Supervised play area with educational activities, games, and entertainment for children of all ages.',
    image: 'https://images.unsplash.com/photo-1526634332515-d56c5fd16991?w=500&auto=format',
    icon: 'game-controller-outline',
    category: 'Kids'
  },
  {
    id: '7',
    title: 'Skyline Bar & Lounge',
    description: 'Sophisticated rooftop bar offering craft cocktails, premium spirits, and panoramic views of the city.',
    image: 'https://content.jdmagicbox.com/v2/comp/bangalore/t3/080pxx80.xx80.181011132510.r7t3/catalogue/tree-tops-bar-and-kitchen-richmond-road-bangalore-continental-restaurants-7ex7rz17qo.jpg',
    icon: 'wine-outline',
    category: 'Dining'
  },
  {
    id: '8',
    title: 'Business Center',
    description: 'Fully equipped business center with meeting rooms, video conferencing facilities, and secretarial services.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format',
    icon: 'business-outline',
    category: 'Business'
  },
  {
    id: '9',
    title: 'Tennis Courts',
    description: 'Professional-grade tennis courts with equipment rental and coaching services available.',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&auto=format',
    icon: 'tennis-ball-outline',
    category: 'Recreation'
  },
  {
    id: '10',
    title: 'Fine Dining Restaurant',
    description: 'Award-winning restaurant serving international cuisine with an extensive wine collection.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format',
    icon: 'restaurant-outline',
    category: 'Dining'
  }
];

const categories = [
  'Accommodation',
  'Dining',
  'Recreation',
  'Events',
  'Wellness',
  'Kids',
  'Business',
  'Other'
];

const icons = [
  'bed-outline',
  'business-outline',
  'water-outline',
  'restaurant-outline',
  'barbell-outline',
  'wine-outline',
  'spa-outline',
  'game-controller-outline',
  'tennis-ball-outline',
  'leaf-outline'
];

const galleryItems = [
  {
    id: 1,
    title: 'Main Restaurant',
    description: 'Our elegant main dining area with modern decor',
    image: 'https://source.unsplash.com/800x600/?restaurant',
  },
  {
    id: 2,
    title: 'Outdoor Seating',
    description: 'Beautiful garden seating for a natural dining experience',
    image: 'https://source.unsplash.com/800x600/?outdoor-restaurant',
  },
  {
    id: 3,
    title: 'Private Dining Room',
    description: 'Exclusive dining space for special occasions',
    image: 'https://source.unsplash.com/800x600/?private-dining',
  },
  {
    id: 4,
    title: 'Bar & Lounge',
    description: 'Sophisticated bar area with premium beverages',
    image: 'https://source.unsplash.com/800x600/?restaurant-bar',
  },
  {
    id: 5,
    title: 'Kitchen',
    description: 'State-of-the-art kitchen where culinary magic happens',
    image: 'https://source.unsplash.com/800x600/?restaurant-kitchen',
  },
  {
    id: 6,
    title: 'Banquet Hall',
    description: 'Spacious venue for large gatherings and events',
    image: 'https://source.unsplash.com/800x600/?banquet-hall',
  },
];

const HotelGallery = () => {
  const theme = useTheme();
  const [amenities, setAmenities] = useState(defaultAmenities);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    icon: '',
    category: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://source.unsplash.com/800x600/?restaurant,interior',
      title: 'Restaurant Interior',
      description: 'Modern and elegant dining space',
    },
    {
      id: 2,
      url: 'https://source.unsplash.com/800x600/?food,indian',
      title: 'Signature Dishes',
      description: 'Our most popular culinary creations',
    },
    {
      id: 3,
      url: 'https://source.unsplash.com/800x600/?kitchen,chef',
      title: 'Kitchen',
      description: 'Where the magic happens',
    },
    {
      id: 4,
      url: 'https://source.unsplash.com/800x600/?dining,table',
      title: 'Dining Area',
      description: 'Comfortable seating arrangements',
    },
    {
      id: 5,
      url: 'https://source.unsplash.com/800x600/?dessert,indian',
      title: 'Desserts',
      description: 'Sweet delights to end your meal',
    },
    {
      id: 6,
      url: 'https://source.unsplash.com/800x600/?restaurant,exterior',
      title: 'Hotel Exterior',
      description: 'Welcome to our establishment',
    },
  ]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newImage, setNewImage] = useState({ title: '', description: '', url: '' });

  const handleOpenDialog = (amenity = null) => {
    if (amenity) {
      setSelectedAmenity(amenity);
      setFormData(amenity);
    } else {
      setSelectedAmenity(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        icon: '',
        category: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAmenity(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedAmenity) {
      // Update existing amenity
      setAmenities((prev) =>
        prev.map((item) =>
          item.id === selectedAmenity.id
            ? { ...formData, id: item.id }
            : item
        )
      );
    } else {
      // Add new amenity
      const newAmenity = {
        ...formData,
        id: Date.now().toString(),
      };
      setAmenities((prev) => [...prev, newAmenity]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setAmenities((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredAmenities = selectedCategory === 'all'
    ? amenities
    : amenities.filter(item => item.category === selectedCategory);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleAddImage = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewImage({ title: '', description: '', url: '' });
  };

  const handleSaveNewImage = () => {
    if (newImage.title && newImage.description && newImage.url) {
      setImages([
        ...images,
        {
          id: images.length + 1,
          ...newImage,
        },
      ]);
      handleAddDialogClose();
    }
  };

  const handleDeleteImage = (imageId) => {
    setImages(images.filter((img) => img.id !== imageId));
    if (selectedImage?.id === imageId) {
      setSelectedImage(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Hotel Gallery Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage your hotel amenities and facilities
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add New Amenity
          </Button>
        </Box>

        {/* Category Filter */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="All"
              onClick={() => setSelectedCategory('all')}
              color={selectedCategory === 'all' ? 'primary' : 'default'}
              variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Paper>

        {/* Amenities Grid */}
        <Grid container spacing={3}>
          {filteredAmenities.map((amenity) => (
            <Grid item xs={12} sm={6} md={4} key={amenity.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={amenity.image}
                  alt={amenity.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {amenity.title}
                    </Typography>
                    <Chip
                      label={amenity.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {amenity.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(amenity)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(amenity.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedAmenity ? 'Edit Amenity' : 'Add New Amenity'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Icon</InputLabel>
                  <Select
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    label="Icon"
                  >
                    {icons.map((icon) => (
                      <MenuItem key={icon} value={icon}>
                        {icon}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              {selectedAmenity ? 'Update' : 'Add'} Amenity
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
                  }
                }}
                onClick={() => handleImageClick(image)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url}
                  alt={image.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {image.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {image.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={Boolean(selectedImage)}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
        >
          {selectedImage && (
            <Box sx={{ position: 'relative' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'black',
                }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    left: 8,
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                  onClick={handlePrev}
                >
                  <PrevIcon />
                </IconButton>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  style={{
                    maxHeight: '80vh',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 8,
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                  onClick={handleNext}
                >
                  <NextIcon />
                </IconButton>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">{selectedImage.title}</Typography>
                <Typography variant="body1">{selectedImage.description}</Typography>
              </Box>
            </Box>
          )}
        </Dialog>

        {/* Add Image Dialog */}
        <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
          <DialogTitle>Add New Image</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Image Title"
              fullWidth
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Image Description"
              fullWidth
              value={newImage.description}
              onChange={(e) =>
                setNewImage({ ...newImage, description: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Image URL"
              fullWidth
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose}>Cancel</Button>
            <Button onClick={handleSaveNewImage} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default HotelGallery; 