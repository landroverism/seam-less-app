import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Divider, 
  Container,
  InputAdornment,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { Scissors, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          py: 4
        }}
      >
        {/* Seamless header with scissor icon */}
        <Box 
          component={Link} 
          to="/"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            textDecoration: 'none',
            color: 'primary.main',
            mb: 4
          }}
        >
          <Scissors size={28} color="#E74C3C" />
          <Typography variant="h5" fontWeight={700}>
            Seamless
          </Typography>
        </Box>

        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h4" gutterBottom align="center" fontWeight={600}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Sign in to access your account
            </Typography>

            <Box component="form" sx={{ '& > :not(style)': { mb: 3 } }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                size="medium"
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                required
                size="medium"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  fontWeight: 600
                }}
              >
                Sign In
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Button 
                  color="primary" 
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                  component={Link}
                  to="/register"
                >
                  Sign Up
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;