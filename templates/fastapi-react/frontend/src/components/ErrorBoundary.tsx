import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Typography, Button } from '@mui/material';
import { StyledPaper } from '../StyledComponents';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <StyledPaper>
          <Typography variant="h5" color="error">
            Oops, there was an error!
          </Typography>
          <Typography variant="body1">
            {this.state.error && this.state.error.toString()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </Button>
        </StyledPaper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;