import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  MeetingRoom as MeetingRoomIcon,
  Event as EventIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

const AboutUs = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Hotel Exterior"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Star Hotel - Where Luxury Meets Tradition
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2010, Star Hotel has been a symbol of luxury and excellence in hospitality. 
                Our commitment to providing exceptional service and creating memorable experiences has made us 
                one of the most prestigious hotels in the region.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph>
                    To provide unparalleled hospitality experiences through personalized service, 
                    luxurious accommodations, and culinary excellence while maintaining our cultural heritage.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Key Features
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <RestaurantIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Fine Dining Restaurants" 
                        secondary="Multiple cuisine options including Indian, Continental, and Chinese"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <MeetingRoomIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Luxury Accommodations" 
                        secondary="200+ rooms and suites with modern amenities"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'error.main' }}>
                          <EventIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Event Spaces" 
                        secondary="State-of-the-art conference rooms and banquet halls"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LocationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Location" 
                        secondary="123 Luxury Avenue, City Center, Pin: 560001"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PhoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Contact" 
                        secondary="+91 80 1234 5678 | info@starhotel.com"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Awards & Recognition
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <StarIcon sx={{ fontSize: 40, color: 'gold' }} />
                    <Typography variant="subtitle1">
                      Best Luxury Hotel 2023
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Tourism Excellence Awards
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <RestaurantIcon sx={{ fontSize: 40, color: 'gold' }} />
                    <Typography variant="subtitle1">
                      Culinary Excellence
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Food Critics Choice 2023
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <EmojiEventsIcon sx={{ fontSize: 40, color: 'gold' }} />
                    <Typography variant="subtitle1">
                      Service Excellence
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Hospitality Awards 2023
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs; 