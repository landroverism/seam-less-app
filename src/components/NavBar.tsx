import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { 
  Scissors, 
  Menu, 
  Home, 
  Ruler, 
  Users, 
  Info 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { 
      label: 'Home', 
      path: '/',
      icon: Home
    },
    { 
      label: 'Measurements', 
      path: '/measurements',
      icon: Ruler
    },
    { 
      label: 'Find Tailors', 
      path: '/tailors',
      icon: Users
    },
    { 
      label: 'About Us', 
      path: '/about',
      icon: Info
    }
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid #BDC3C7',
        backgroundColor: 'background.paper',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64 }}>
          <Box 
            component={Link} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              '&:hover .logo-icon': {
                transform: 'rotate(45deg)',
                color: 'secondary.main'
              },
              '&:hover .logo-text': {
                color: 'secondary.main'
              }
            }}
          >
            <Scissors 
              className="logo-icon"
              size={24} 
              color="#E74C3C" 
              style={{ 
                transition: 'transform 0.3s ease, color 0.3s ease'
              }} 
            />
            <Typography 
              variant="h6" 
              className="logo-text"
              sx={{ 
                transition: 'color 0.3s ease'
              }}
            >
              Seamless
            </Typography>
          </Box>

          {!isMobile && (
            <>
              <Box sx={{ display: 'flex', ml: 8, gap: 4 }}>
                {menuItems.map((item) => (
                  <Box
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      position: 'relative',
                      color: 'text.secondary',
                      textDecoration: 'none',
                      py: 2,
                      '&:hover': {
                        color: 'primary.main'
                      },
                      '&:hover::after': {
                        width: '100%'
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: '2px',
                        backgroundColor: 'secondary.main',
                        transition: 'width 0.3s ease'
                      }
                    }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>

              <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/login')}
                  sx={{
                    '&:hover': {
                      borderColor: 'secondary.main',
                      color: 'secondary.main'
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/register')}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.light'
                    }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </>
          )}

          {isMobile && (
            <Box sx={{ ml: 'auto' }}>
              <Button 
                onClick={toggleDrawer(true)}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <Menu size={24} color={theme.palette.primary.main} />
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '300px'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Scissors size={24} color="#E74C3C" />
          <Typography variant="h6" color="primary" fontWeight={700}>
            Seamless
          </Typography>
        </Box>
        
        <List sx={{ p: 2 }}>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button 
              variant="outlined" 
              fullWidth
              onClick={() => {
                navigate('/login');
                setDrawerOpen(false);
              }}
            >
              Sign In
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              fullWidth
              onClick={() => {
                navigate('/register');
                setDrawerOpen(false);
              }}
            >
              Get Started
            </Button>
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
