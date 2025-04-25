import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Ruler, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: 'center',
          mb: 8,
          mt: { xs: 4, md: 8 },
          px: 2
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h1" 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
            fontWeight: 700
          }}
        >
          Custom Tailoring, Simplified
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ 
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Get perfectly fitted garments from expert tailors, all from the comfort of your home
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          color="primary" 
          sx={{ 
            mr: 2,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
        <Button 
          variant="outlined" 
          size="large"
          sx={{ 
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
          onClick={() => navigate('/about')}
        >
          Learn More
        </Button>
      </Box>

      <Grid container spacing={4}>
        {[
          {
            icon: <Ruler size={32} />,
            title: 'Easy Measurements',
            description: 'Follow our guided measurement process with video tutorials',
          },
          {
            icon: <Users size={32} />,
            title: 'Expert Tailors',
            description: 'Connect with skilled tailors and view their portfolios',
          },
          {
            icon: <Clock size={32} />,
            title: 'Quick Turnaround',
            description: 'Get your custom garments delivered within 2-3 weeks',
          },
        ].map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              component={motion.div}
              whileHover={{ y: -5 }}
              sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box sx={{ color: 'secondary.main', mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;