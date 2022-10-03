import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const  LoadingComponent = () => {
  return (
    <Box sx={{ display: 'flex' , justifyContent : 'center'}}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingComponent;
