import React from 'react';
import { Typography, Button } from '@mui/material';
import { WidgetA } from '../../../types';
import { StyledPaper } from '../../../StyledComponents';

interface WidgetADetailProps {
  widget: WidgetA;
  onEdit: () => void;
}

const WidgetADetail: React.FC<WidgetADetailProps> = ({ widget, onEdit }) => {
  return (
    <StyledPaper>
      <Typography variant="h5" component="div">
        {widget.name}
      </Typography>
      {widget.description && (
        <Typography variant="body2" color="text.secondary">
          {widget.description}
        </Typography>
      )}
      <Typography variant="body2">
        Created: {new Date(widget.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body2">
        Last Updated: {new Date(widget.updatedAt).toLocaleString()}
      </Typography>
      <Button onClick={onEdit} variant="outlined" color="primary" style={{ marginTop: '1rem' }}>
        Edit
      </Button>
    </StyledPaper>
  );
};

export default WidgetADetail;