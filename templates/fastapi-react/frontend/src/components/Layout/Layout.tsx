import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import TopNav from './TopNav';
import SubNav from './SubNav';
import LeftNav from './LeftNav';
import theme from '../../theme';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [leftNavOpen, setLeftNavOpen] = useState(false);

  const toggleLeftNav = () => {
    setLeftNavOpen(!leftNavOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopNav toggleLeftNav={toggleLeftNav} />
        <SubNav />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <LeftNav open={leftNavOpen} onClose={() => setLeftNavOpen(false)} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;