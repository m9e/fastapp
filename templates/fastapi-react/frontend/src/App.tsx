import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WidgetAPage from './features/widgets/pages/WidgetAPage';
import WidgetBPage from './features/widgets/pages/WidgetBPage';
import HomePage from './features/home/pages/HomePage';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/widgets-a" element={<WidgetAPage />} />
            <Route path="/widgets-b" element={<WidgetBPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;