import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { WidgetB } from '../../../types';

interface WidgetBListProps {
  widgets: WidgetB[];
}

const WidgetBList: React.FC<WidgetBListProps> = ({ widgets }) => {
  return (
    <List>
      {widgets.map((widget) => (
        <ListItem key={widget.id}>
          <ListItemText primary={widget.name} secondary={`${widget.description} (Widget A ID: ${widget.widgetAId})`} />
        </ListItem>
      ))}
    </List>
  );
};

export default WidgetBList;