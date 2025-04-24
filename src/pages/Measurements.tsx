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
  Paper
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowLeft, ArrowRight, Save, RefreshCw } from 'lucide-react';

const VideoPlayer = ({ videoUrl, title }: { videoUrl: string; title: string }) => {
  const getYouTubeVideoId = (url: string) => {
    if (!url) return '';
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1] : '';
  };

  const videoId = getYouTubeVideoId(videoUrl);
  console.log('Video URL:', videoUrl);
  console.log('Video ID:', videoId);

  if (!videoId) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          width: '100%',
          height: { xs: '150px', sm: '200px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.200',
          borderRadius: { xs: 1, sm: 2 },
          mb: { xs: 2, sm: 3 }
        }}
      >
        <Typography color="text.secondary">Video not available</Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        position: 'relative',
        width: '100%',
        paddingTop: { xs: '56.25%', sm: '56.25%' },
        borderRadius: { xs: 1, sm: 2 },
        overflow: 'hidden',
        backgroundColor: 'black',
        maxWidth: '100%',
        margin: '0 auto',
        mb: { xs: 2, sm: 3 }
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Paper>
  );
};

const measurementSteps = [
  {
    label: 'Chest',
    instructions: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.',
    videoUrl: 'https://www.youtube.com/watch?v=8zPQI-SWdI8&pp=ygUSbWVhc3VyZSB5b3VyIGNoZXN0',
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
    videoUrl: 'https://www.youtube.com/watch?v=ZOuF0x4Mk3o&pp=ygUSbWVhc3VyZSB5b3VyIHdhaXN0',
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
    videoUrl: 'https://www.youtube.com/watch?v=jfIg_sYChSE&pp=ygUWbWVhc3VyZSB5b3VyIHNob3VsZGVycw%3D%3D',
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [measurements, setMeasurements] = useState<Record<string, number>>({});
  const [showTips, setShowTips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

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
    const currentStep = measurementSteps[activeStep];
    
    if (!isNaN(numValue)) {
      setMeasurements(prev => ({
        ...prev,
        [currentStep.label]: numValue
      }));
    }
  };

  const isValidMeasurement = () => {
    const currentStep = measurementSteps[activeStep];
    const value = measurements[currentStep.label];
    return value >= currentStep.minValue && value <= currentStep.maxValue;
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaved(true);
    setLoading(false);
  };

  const currentMeasurement = measurements[measurementSteps[activeStep].label] || '';

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          gutterBottom 
          align="center"
          sx={{ 
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.75rem' },
            mt: { xs: 2, sm: 3 }
          }}
        >
          Take Your Measurements
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: { xs: 3, sm: 4, md: 6 },
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            px: { xs: 1, sm: 0 }
          }}
        >
          Follow our step-by-step guide for accurate measurements
        </Typography>
      </Box>

      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        sx={{ 
          mb: { xs: 3, sm: 4 },
          overflowX: 'auto',
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

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} md={6}>
          <AnimatePresence mode="wait">
            <Box
              component={motion.div}
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
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
                  <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                      mb: { xs: 1, sm: 2 }
                    }}
                  >
                    {measurementSteps[activeStep].label}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      mb: { xs: 2, sm: 3 }
                    }}
                  >
                    {measurementSteps[activeStep].instructions}
                  </Typography>

                  <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography 
                        variant="h6"
                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                      >
                        Tips
                      </Typography>
                      <Tooltip title="Show/Hide Tips">
                        <IconButton size="small" onClick={() => setShowTips(!showTips)} sx={{ ml: 1 }}>
                          <HelpCircle size={16} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    <AnimatePresence>
                      {showTips && (
                        <Box
                          component={motion.div}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          sx={{ overflow: 'hidden' }}
                        >
                          <Alert 
                            severity="info" 
                            sx={{ 
                              mt: 1,
                              '& .MuiAlert-message': {
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                              }
                            }}
                          >
                            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                              {measurementSteps[activeStep].tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </Alert>
                        </Box>
                      )}
                    </AnimatePresence>
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography 
                        variant="subtitle1"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        Enter your {measurementSteps[activeStep].label.toLowerCase()} measurement:
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        type="number"
                        value={currentMeasurement}
                        onChange={(e) => handleMeasurementChange(e.target.value)}
                        InputProps={{
                          endAdornment: <Typography variant="body2" color="text.secondary">{measurementSteps[activeStep].unit}</Typography>,
                        }}
                        fullWidth
                        size="small"
                        sx={{ 
                          '& .MuiInputBase-input': {
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                          }
                        }}
                      />
                      <Tooltip title="Reset">
                        <IconButton 
                          onClick={() => handleMeasurementChange('')}
                          size="small"
                          sx={{ ml: 1 }}
                        >
                          <RefreshCw size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    {currentMeasurement && !isValidMeasurement() && (
                      <Typography 
                        color="error" 
                        variant="caption" 
                        sx={{ 
                          display: 'block', 
                          mt: 1,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }}
                      >
                        Please enter a value between {measurementSteps[activeStep].minValue} and {measurementSteps[activeStep].maxValue} {measurementSteps[activeStep].unit}
                      </Typography>
                    )}
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
                  mb: { xs: 2, sm: 3 }
                }}
              >
                How to Measure
              </Typography>
              
              <VideoPlayer 
                videoUrl={measurementSteps[activeStep].videoUrl} 
                title={`How to measure your ${measurementSteps[activeStep].label.toLowerCase()}`} 
              />
              
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
                    Previous
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
                    {activeStep === measurementSteps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save size={16} />}
                        onClick={handleSave}
                        disabled={loading || saved || Object.keys(measurements).length < measurementSteps.length}
                        sx={{ 
                          width: { xs: '100%', sm: 'auto' },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        {loading ? 'Saving...' : saved ? 'Saved' : 'Save All Measurements'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowRight size={16} />}
                        onClick={handleNext}
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
                  <LinearProgress sx={{ mt: 2 }} />
                )}
                
                {saved && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Your measurements have been saved successfully!
                  </Alert>
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