import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  TextField,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
  Paper,
  Collapse,
  useMediaQuery,
  useTheme,
  Snackbar
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowLeft, ArrowRight, Save, RefreshCw } from 'lucide-react';
import SimpleYouTubePlayer from '../components/SimpleYouTubePlayer';

const measurementSteps = [
  {
    label: 'Chest',
    instructions: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.',
    videoId: 'zANQQLTvAHk', // Direct video ID
    tips: [
      'Take a deep breath and measure',
      'Keep the tape snug but not tight',
      'Make sure the tape is level around your body'
    ],
    minValue: 30,
    maxValue: 60,
    unit: 'inches'
  },
  {
    label: 'Waist',
    instructions: 'Measure around your natural waistline, keeping the tape comfortably loose.',
    videoId: 'ZOuF0x4Mk3o', // Direct video ID
    tips: [
      'Locate your natural waistline',
      'Keep one finger between the tape and your body',
      'Avoid measuring over thick clothing'
    ],
    minValue: 24,
    maxValue: 50,
    unit: 'inches'
  },
  {
    label: 'Shoulders',
    instructions: 'Measure across the back from shoulder point to shoulder point.',
    videoId: 'jfIg_sYChSE', // Direct video ID
    tips: [
      'Stand naturally with arms at sides',
      'Measure from the outer edges of each shoulder',
      'Keep the tape straight across the back'
    ],
    minValue: 14,
    maxValue: 30,
    unit: 'inches'
  }
];

const Measurements = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [measurements, setMeasurements] = useState<Record<string, number>>({});
  const [showTips, setShowTips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);

  const currentStep = measurementSteps[activeStep];
  const isLastStep = activeStep === measurementSteps.length - 1;

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, measurementSteps.length - 1));
    setShowTips(false);
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
    setShowTips(false);
  };

  const handleMeasurementChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setMeasurements(prev => ({
        ...prev,
        [currentStep.label]: numValue
      }));
    } else {
      // If the value is not a valid number, remove the measurement
      const newMeasurements = { ...measurements };
      delete newMeasurements[currentStep.label];
      setMeasurements(newMeasurements);
    }
    setSaved(false);
  };

  const isValidMeasurement = () => {
    const value = measurements[currentStep.label];
    return value !== undefined && 
           value >= currentStep.minValue && 
           value <= currentStep.maxValue;
  };

  const canSave = () => {
    return Object.keys(measurements).length === measurementSteps.length && 
           !Object.entries(measurements).some(([key, value]) => {
             const step = measurementSteps.find(s => s.label === key);
             return step && (value < step.minValue || value > step.maxValue);
           });
  };

  const handleSave = () => {
    if (!canSave()) return;
    
    setLoading(true);
    setSaveProgress(0);
    
    // Simulate API call with progress
    const interval = setInterval(() => {
      setSaveProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSaved(true);
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };

  const resetMeasurements = () => {
    setMeasurements({});
    setActiveStep(0);
    setSaved(false);
    setShowTips(false);
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.75rem', sm: '2.5rem' }
          }}
        >
          Take Your Measurements
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Follow our step-by-step guide for accurate measurements
        </Typography>
      </Box>
      
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        sx={{ 
          mb: { xs: 4, sm: 5 },
          '& .MuiStepLabel-label': {
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }
        }}
      >
        {measurementSteps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {/* Desktop alert - only show on larger screens */}
      {saved && !isMobile && (
        <Alert 
          severity="success" 
          sx={{ mb: 4 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              startIcon={<RefreshCw size={16} />}
              onClick={resetMeasurements}
            >
              Start New Measurements
            </Button>
          }
        >
          Your measurements have been saved successfully!
        </Alert>
      )}
      
      {/* Mobile alert - show as a snackbar on smaller screens */}
      <Snackbar
        open={saved && isMobile}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ 
          bottom: { xs: 16, sm: 24 },
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '90vw'
          }
        }}
      >
        <Alert 
          severity="success"
          sx={{ width: '100%' }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              startIcon={<RefreshCw size={16} />}
              onClick={resetMeasurements}
            >
              New
            </Button>
          }
        >
          Measurements saved successfully!
        </Alert>
      </Snackbar>
      
      <Grid container spacing={isTablet ? 2 : 3}>
        <Grid item xs={12} md={6}>
          <AnimatePresence mode="wait">
            <Box
              component={motion.div}
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: { xs: 2, sm: 3 }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography 
                      variant="h5" 
                      component="h2"
                      sx={{ 
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        fontWeight: 600
                      }}
                    >
                      {currentStep.label}
                    </Typography>
                    
                    <Tooltip title={showTips ? "Hide Tips" : "Show Tips"}>
                      <IconButton 
                        size="small" 
                        onClick={() => setShowTips(!showTips)}
                        sx={{ 
                          backgroundColor: showTips ? 'primary.light' : 'transparent',
                          color: showTips ? 'white' : 'inherit',
                          '&:hover': {
                            backgroundColor: showTips ? 'primary.main' : 'action.hover'
                          }
                        }}
                      >
                        <HelpCircle size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{ 
                      mb: { xs: 2, sm: 3 },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      color: 'text.secondary'
                    }}
                  >
                    {currentStep.instructions}
                  </Typography>
                  
                  <Collapse in={showTips}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: { xs: 1.5, sm: 2 },
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                        borderRadius: { xs: 1, sm: 2 },
                        mb: { xs: 2, sm: 3 }
                      }}
                    >
                      <Typography 
                        variant="subtitle1" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        Measurement Tips:
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {currentStep.tips.map((tip, index) => (
                          <Typography 
                            component="li" 
                            key={index}
                            sx={{ 
                              mb: 0.5,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                          >
                            {tip}
                          </Typography>
                        ))}
                      </Box>
                    </Paper>
                  </Collapse>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography 
                      variant="subtitle1" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      Enter your {currentStep.label.toLowerCase()} measurement:
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TextField
                        type="number"
                        value={measurements[currentStep.label] || ''}
                        onChange={(e) => handleMeasurementChange(e.target.value)}
                        placeholder={`${currentStep.minValue}-${currentStep.maxValue}`}
                        variant="outlined"
                        size="small"
                        inputProps={{ 
                          min: currentStep.minValue,
                          max: currentStep.maxValue,
                          step: 0.5
                        }}
                        sx={{ 
                          width: '100%',
                          mr: 1
                        }}
                        error={measurements[currentStep.label] !== undefined && !isValidMeasurement()}
                        helperText={
                          measurements[currentStep.label] !== undefined && !isValidMeasurement() 
                            ? `Please enter a value between ${currentStep.minValue} and ${currentStep.maxValue} ${currentStep.unit}`
                            : null
                        }
                        InputProps={{
                          endAdornment: (
                            <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>
                              {currentStep.unit}
                            </Box>
                          ),
                        }}
                      />
                      
                      <IconButton 
                        size="small" 
                        onClick={() => handleMeasurementChange('')}
                        title="Reset"
                      >
                        <RefreshCw size={16} />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </AnimatePresence>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: { xs: 2, sm: 3 }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  mb: { xs: 2, sm: 3 },
                  fontWeight: 600
                }}
              >
                Video Tutorial
              </Typography>
              
              <Box sx={{ 
                position: 'relative',
                paddingTop: '56.25%', // 16:9 aspect ratio
                width: '100%',
                mb: 3
              }}>
                <Box sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}>
                  <SimpleYouTubePlayer 
                    videoId={currentStep.videoId}
                    title={`How to measure your ${currentStep.label.toLowerCase()}`} 
                  />
                </Box>
              </Box>
              
              <Box sx={{ mt: 'auto' }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 0 }
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ArrowLeft size={16} />}
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ 
                      width: { xs: '100%', sm: 'auto' },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Back
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
                    {isLastStep ? (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save size={16} />}
                        onClick={handleSave}
                        disabled={loading || saved || !canSave()}
                        sx={{ 
                          width: { xs: '100%', sm: 'auto' },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        {loading ? 'Saving...' : saved ? 'Saved' : 'Save Measurements'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowRight size={16} />}
                        onClick={handleNext}
                        disabled={!isValidMeasurement()}
                        sx={{ 
                          width: { xs: '100%', sm: 'auto' },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
                
                {loading && (
                  <LinearProgress 
                    variant="determinate" 
                    value={saveProgress} 
                    sx={{ mt: 2 }} 
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Measurements;