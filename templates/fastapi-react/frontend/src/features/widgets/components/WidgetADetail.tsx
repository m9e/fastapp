// src/features/widgets/components/WidgetADetail.tsx

import React from 'react';
import { Typography, Button } from '@mui/material';
import { WidgetA } from '../../../types';
import { StyledPaper } from '../../../StyledComponents';

interface WidgetADetailProps {
  widget: WidgetA;
  onEdit: () => void;
}

const WidgetADetail: React.FC<WidgetADetailProps> = ({ widget, onEdit }) => {
  return (
    <StyledPaper>
      <Typography variant="h5" component="div">
        {widget.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {widget.description}
      </Typography>
      <Button onClick={onEdit} variant="outlined" color="primary" style={{ marginTop: '1rem' }}>
        Edit
      </Button>
    </StyledPaper>
  );
};

export default WidgetADetail;