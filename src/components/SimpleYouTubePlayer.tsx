import React from 'react';
import { Typography, Paper } from '@mui/material';

interface SimpleYouTubePlayerProps {
  videoId: string;
  title: string;
}

const SimpleYouTubePlayer: React.FC<SimpleYouTubePlayerProps> = ({ videoId, title }) => {
  if (!videoId) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.200',
          borderRadius: 2
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
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'black',
        borderRadius: 2
      }}
    >
      <iframe
        style={{
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

export default SimpleYouTubePlayer;
