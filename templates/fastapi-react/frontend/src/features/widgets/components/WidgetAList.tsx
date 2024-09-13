import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { WidgetA, PaginatedResponse } from '../../../types';

interface WidgetAListProps {
  paginatedWidgets: PaginatedResponse<WidgetA>;
  onSelectWidget: (widget: WidgetA) => void;
  onEditWidget: (widget: WidgetA) => void;
  onDeleteWidget: (id: number) => void;
}

const WidgetAList: React.FC<WidgetAListProps> = ({
  paginatedWidgets,
  onSelectWidget,
  onEditWidget,
  onDeleteWidget,
}) => {
  console.log('WidgetAList received:', paginatedWidgets); // Add this line

  if (paginatedWidgets.items.length === 0) {
    return <Typography>No widgets found.</Typography>;
  }

  return (
    <>
      <List>
        {paginatedWidgets.items.map((widget) => (
          <ListItem key={widget.id}>
            <ListItemText
              primary={widget.name}
              secondary={widget.description || 'No description'}
              onClick={() => onSelectWidget(widget)}
            />
            <IconButton onClick={() => onEditWidget(widget)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDeleteWidget(widget.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="body2">
        Page {paginatedWidgets.page} of {paginatedWidgets.total_pages} (Total items: {paginatedWidgets.total})
      </Typography>
    </>
  );
};

export default WidgetAList;