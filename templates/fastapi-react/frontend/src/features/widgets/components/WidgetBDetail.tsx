import React from 'react';
import { Typography, Button } from '@mui/material';
import { WidgetB } from '../../../types';
import { StyledPaper } from '../../../StyledComponents';

interface WidgetBDetailProps {
  widget: WidgetB;
  onEdit: () => void;  // Add this line
}

const WidgetBDetail: React.FC<WidgetBDetailProps> = ({ widget, onEdit }) => {
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
        Associated Widget A ID: {widget.widgetAId}
      </Typography>
      <Typography variant="body2">
        Created: {new Date(widget.created_at).toLocaleString()}
      </Typography>
      <Typography variant="body2">
        Last Updated: {new Date(widget.updated_at).toLocaleString()}
      </Typography>
      <Button onClick={onEdit} variant="outlined" color="primary" style={{ marginTop: '1rem' }}>
        Edit
      </Button>
    </StyledPaper>
  );
};

export default WidgetBDetail;