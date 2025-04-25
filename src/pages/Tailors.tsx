import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Rating, 
  Chip, 
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const tailors = [
  {
    id: 1,
    name: 'Kelly Kevin',
    specialty: 'Formal Wear',
    rating: 4.8,
    experience: '15 years',
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    email: 'kelly@seamless.com',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Ham Kemboi',
    specialty: 'Suits & Blazers',
    rating: 4.9,
    experience: '12 years',
    location: 'Los Angeles, CA',
    phone: '+1 (555) 987-6543',
    email: 'ham@seamless.com',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Cecilia Gatimu',
    specialty: 'Wedding Dresses',
    rating: 5.0,
    experience: '20 years',
    location: 'Chicago, IL',
    phone: '+1 (555) 456-7890',
    email: 'cecilia@seamless.com',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'David Chen',
    specialty: 'Casual Wear',
    rating: 4.7,
    experience: '8 years',
    location: 'Seattle, WA',
    phone: '+1 (555) 234-5678',
    email: 'david@seamless.com',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
  }
];

const Tailors = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{ mb: { xs: 4, md: 6 } }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          align="center"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700
          }}
        >
          Our Expert Tailors
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: { xs: 3, md: 5 },
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Connect with skilled professionals for your custom garments
        </Typography>

        <Grid container spacing={isTablet ? 2 : 4}>
          {tailors.map((tailor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tailor.id}>
              <Card
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <CardMedia
                  component="img"
                  height={isMobile ? "180" : "220"}
                  image={tailor.image}
                  alt={tailor.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    {tailor.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip 
                      label={tailor.specialty} 
                      color="primary" 
                      size="small" 
                      sx={{ fontWeight: 500 }} 
                    />
                    <Chip 
                      label={tailor.experience} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontWeight: 500 }} 
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={tailor.rating} precision={0.1} readOnly size={isMobile ? "small" : "medium"} />
                    <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                      ({tailor.rating})
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MapPin size={16} style={{ marginRight: 8 }} />
                      <Typography variant="body2" color="text.secondary">
                        {tailor.location}
                      </Typography>
                    </Box>
                    
                    {!isMobile && (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Phone size={16} style={{ marginRight: 8 }} />
                          <Typography variant="body2" color="text.secondary">
                            {tailor.phone}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Mail size={16} style={{ marginRight: 8 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {tailor.email}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      mt: 'auto',
                      py: 1,
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Tailors;