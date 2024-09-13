import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { WidgetA } from '../../../types';

interface WidgetAListProps {
  widgets: WidgetA[];
}

const WidgetAList: React.FC<WidgetAListProps> = ({ widgets }) => {
  return (
    <List>
      {widgets.map((widget) => (
        <ListItem key={widget.id}>
          <ListItemText primary={widget.name} secondary={widget.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default WidgetAList;