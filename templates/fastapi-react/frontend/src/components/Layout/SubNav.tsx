import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SubNav: React.FC = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Button color="inherit" component={Link} to="/widgets-a">Widgets A</Button>
        <Button color="inherit" component={Link} to="/widgets-b">Widgets B</Button>
      </Toolbar>
    </AppBar>
  );
};

export default SubNav;
