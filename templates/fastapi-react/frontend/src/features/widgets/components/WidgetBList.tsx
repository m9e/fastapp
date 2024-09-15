import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { WidgetB, PaginatedResponse } from '../../../types';

interface WidgetBListProps {
  paginatedWidgets: PaginatedResponse<WidgetB>;
  onSelectWidget: (widget: WidgetB) => void;
  onDeleteWidget: (id: number) => void;
}

const WidgetBList: React.FC<WidgetBListProps> = ({ paginatedWidgets, onSelectWidget, onDeleteWidget }) => {
  return (
    <List>
      {paginatedWidgets.items.map((widget) => (
        <ListItem key={widget.id}>
          <ListItemText
            primary={widget.name}
            secondary={widget.description}
            onClick={() => onSelectWidget(widget)}
          />
          <IconButton edge="end" aria-label="delete" onClick={() => onDeleteWidget(widget.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default WidgetBList;