import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the FastAPI React Template
        </Typography>
        <Typography variant="body1">
          This is a template project using FastAPI for the backend and React for the frontend.
          It demonstrates CRUD operations with WidgetA and WidgetB entities.
        </Typography>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Use the navigation menu to explore the different pages and functionalities.
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;