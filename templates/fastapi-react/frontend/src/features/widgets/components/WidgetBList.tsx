import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { WidgetB, PaginatedResponse } from '../../../types';

interface WidgetBListProps {
  paginatedWidgets: PaginatedResponse<WidgetB>;
  onSelectWidget: (widget: WidgetB) => void;
  onDeleteWidget: (id: number) => void;
}

const WidgetBList: React.FC<WidgetBListProps> = ({ paginatedWidgets, onSelectWidget, onDeleteWidget }) => {
  return (
    <>
      <List>
        {paginatedWidgets.items.map((widget) => (
          <ListItem key={widget.id}>
            <ListItemText 
              primary={widget.name} 
              secondary={`${widget.description || 'No description'} (Widget A ID: ${widget.widgetAId})`} 
              onClick={() => onSelectWidget(widget)}
            />
            <IconButton onClick={() => onDeleteWidget(widget.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="body2">
        Page {paginatedWidgets.page} of {paginatedWidgets.totalPages} (Total items: {paginatedWidgets.total})
      </Typography>
    </>
  );
};

export default WidgetBList;