import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledPaper } from '../StyledComponents';

const NotFound: React.FC = () => {
  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </StyledPaper>
  );
};

export default NotFound;