
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { WidgetB } from '../../../types';

interface WidgetBDetailProps {
  widget: WidgetB;
}

const WidgetBDetail: React.FC<WidgetBDetailProps> = ({ widget }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {widget.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {widget.description}
        </Typography>
        <Typography variant="body2">
          Associated Widget A ID: {widget.widgetAId}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WidgetBDetail;
