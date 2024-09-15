import React from 'react';
import { Typography, Button } from '@mui/material';
import { WidgetB, WidgetA } from '../../../types';
import { StyledPaper } from '../../../StyledComponents';

interface WidgetBDetailProps {
  widget: WidgetB;
  onEdit: () => void;
  associatedWidgetA?: WidgetA | null;
}

const WidgetBDetail: React.FC<WidgetBDetailProps> = ({ widget, onEdit, associatedWidgetA }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

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
        Associated Widget A: {
          associatedWidgetA 
            ? `${associatedWidgetA.name} (${associatedWidgetA.id})`
            : "None"
        }
      </Typography>
      <Typography variant="body2">
        Created: {formatDate(widget.created_at)}
      </Typography>
      <Typography variant="body2">
        Last Updated: {formatDate(widget.updated_at)}
      </Typography>
      <Button onClick={onEdit} variant="outlined" color="primary" style={{ marginTop: '1rem' }}>
        Edit
      </Button>
    </StyledPaper>
  );
};

export default WidgetBDetail;