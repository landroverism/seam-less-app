import React, { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const YouTubeTest: React.FC = () => {
  useEffect(() => {
    // Log when component mounts to verify it's rendering
    console.log('YouTube Test component mounted');
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        YouTube Embed Test
      </Typography>
      
      <Typography variant="body1" paragraph>
        Testing direct embed with iframe:
      </Typography>
      
      <Paper 
        elevation={2} 
        sx={{ 
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'black',
          maxWidth: '100%',
          margin: '0 auto',
          mb: 3
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
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Test YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Paper>
      
      <Typography variant="body1" paragraph>
        If you can see the video above, YouTube embeds are working correctly.
      </Typography>
    </Box>
  );
};

export default YouTubeTest;
