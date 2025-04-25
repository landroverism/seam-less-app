import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import { theme } from './theme';
import NavBar from './components/NavBar';
import AppFooter from './components/AppFooter';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box className="min-h-screen flex flex-col bg-secondary">
          <NavBar />
          <Box component="main" className="flex-grow">
            <AppRoutes />
          </Box>
          <AppFooter />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;