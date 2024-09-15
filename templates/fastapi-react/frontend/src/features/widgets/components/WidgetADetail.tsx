import React, { useEffect, useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { WidgetA, WidgetB } from '../../../types';  // Remove PaginatedResponse
import { StyledPaper } from '../../../StyledComponents';
import { getWidgetsBByWidgetAId } from '../api';

interface WidgetADetailProps {
  widget: WidgetA;
  onEdit: () => void;
}

const WidgetADetail: React.FC<WidgetADetailProps> = ({ widget, onEdit }) => {
  const [relatedWidgetsB, setRelatedWidgetsB] = useState<WidgetB[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedWidgetsB = async () => {
      try {
        const response = await getWidgetsBByWidgetAId(widget.id);
        setRelatedWidgetsB(response.items);
        setError(null);
      } catch (error) {
        console.error('Error fetching related Widgets B:', error);
        setError('Failed to load related Widgets B');
        setRelatedWidgetsB([]);
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
        Created: {new Date(widget.created_at).toLocaleString()}
      </Typography>
      <Typography variant="body2">
        Last Updated: {new Date(widget.updated_at).toLocaleString()}
      </Typography>
      <Button onClick={onEdit} variant="outlined" color="primary" style={{ marginTop: '1rem' }}>
        Edit
      </Button>

      <Typography variant="h6" style={{ marginTop: '2rem' }}>
        Related Widgets B:
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : relatedWidgetsB.length > 0 ? (
        <List>
          {relatedWidgetsB.map((widgetB) => (
            <ListItem key={widgetB.id}>
              <ListItemText primary={widgetB.name} secondary={widgetB.description} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2">No related Widgets B found.</Typography>
      )}
    </StyledPaper>
  );
};

export default WidgetADetail;