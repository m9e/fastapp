import React, { useEffect, useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { WidgetA, WidgetB } from '../../../types';
import { StyledPaper } from '../../../StyledComponents';
import { getWidgetsBByWidgetAId } from '../api'; // Ensure this function exists

interface WidgetADetailProps {
  widget: WidgetA;
  onEdit: () => void;
}

const WidgetADetail: React.FC<WidgetADetailProps> = ({ widget, onEdit }) => {
  const [relatedWidgetsB, setRelatedWidgetsB] = useState<WidgetB[]>([]);

  useEffect(() => {
    const fetchRelatedWidgetsB = async () => {
      try {
        const response = await getWidgetsBByWidgetAId(widget.id);
        setRelatedWidgetsB(response.items);
      } catch (error) {
        console.error('Failed to fetch related Widgets B:', error);
      }
    };
    fetchRelatedWidgetsB();
  }, [widget.id]);

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
      <Typography variant="h6" style={{ marginTop: '1rem' }}>
        Related Widgets B:
      </Typography>
      <List>
        {relatedWidgetsB.map((widgetB) => (
          <ListItem key={widgetB.id}>
            <ListItemText primary={widgetB.name} secondary={widgetB.description} />
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default WidgetADetail;
