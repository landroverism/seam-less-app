import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Divider 
} from '@mui/material';
import { Scissors, Users, Ruler, Clock, Award, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Ruler size={32} />,
      title: 'Precise Measurements',
      description: 'Our step-by-step guided measurement process ensures perfect fit every time.'
    },
    {
      icon: <Users size={32} />,
      title: 'Expert Tailors',
      description: 'Connect with skilled tailors who specialize in your specific clothing needs.'
    },
    {
      icon: <Clock size={32} />,
      title: 'Time Saving',
      description: 'Skip the in-person fittings and manage your tailoring needs from anywhere.'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Guarantee',
      description: 'We stand behind the quality of every garment made through our platform.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former fashion designer with 15 years of experience in the industry.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Tech innovator with a passion for bringing traditional crafts into the digital age.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Tailor Relations',
      bio: 'Third-generation tailor working to preserve and promote tailoring craftsmanship.',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      name: 'James Wilson',
      role: 'Customer Experience Director',
      bio: 'Dedicated to creating seamless experiences for both customers and tailors.',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            About Seamless
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
            }}
          >
            Revolutionizing the tailoring industry through technology
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: 2,
              mb: 2
            }}
          >
            <Scissors size={32} color="#E74C3C" />
            <Heart size={32} color="#E74C3C" />
            <Users size={32} color="#E74C3C" />
          </Box>
        </Box>

        {/* Our Story Section */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              textAlign: 'center',
              mb: 4
            }}
          >
            Our Story
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Tailor working"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 2,
                  maxHeight: '400px'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="body1" paragraph>
                  Seamless was founded in 2022 with a simple mission: to bridge the gap between skilled tailors and customers seeking quality custom clothing.
                </Typography>
                <Typography variant="body1" paragraph>
                  Our founder, Sarah Johnson, a former fashion designer, recognized that while mass-produced clothing dominated the market, there was still a strong desire for personalized, well-fitted garments.
                </Typography>
                <Typography variant="body1" paragraph>
                  At the same time, many skilled tailors were struggling to connect with new customers in an increasingly digital world. Seamless was born to solve both problems.
                </Typography>
                <Typography variant="body1">
                  Today, we're proud to connect thousands of customers with talented tailors around the world, making custom clothing more accessible than ever before.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: { xs: 6, md: 10 } }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              textAlign: 'center',
              mb: 4
            }}
          >
            Why Choose Seamless
          </Typography>
          
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 2,
                        color: 'secondary.main'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              textAlign: 'center',
              mb: 4
            }}
          >
            Meet Our Team
          </Typography>
          
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ position: 'relative', pt: '100%' }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: 0
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                      {member.role}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
