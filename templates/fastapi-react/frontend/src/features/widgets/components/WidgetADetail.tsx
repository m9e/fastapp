import React from 'react';
import { useEffect, useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { WidgetA, WidgetB } from '../../../types';
import { getWidgetsBByWidgetAId } from '../api'; // Ensure this function can filter by widgetAId
import { StyledPaper } from '../../../StyledComponents';

interface WidgetADetailProps {
  widget: WidgetA;
  onEdit: () => void;
}

const [relatedWidgetsB, setRelatedWidgetsB] = useState<WidgetB[]>([]);

useEffect(() => {
  const fetchRelatedWidgetsB = async () => {
    const response = await getWidgetsBByWidgetAId(widget.id);
    setRelatedWidgetsB(response.items);
  };
  fetchRelatedWidgetsB();
}, [widget.id]);


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
      <Typography variant="h6">Related Widgets B:</Typography>
      <List>
        {relatedWidgetsB.map((widgetB) => (
          <ListItem key={widgetB.id}>
            <ListItemText primary={widgetB.name} secondary={widgetB.description} />
          </ListItem>
        ))}
      </List>
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