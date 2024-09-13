import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import WidgetBList from '../components/WidgetBList';
import WidgetBDetail from '../components/WidgetBDetail';
import { getWidgetsB, createWidgetB } from '../api';
import { WidgetB } from '../../../types';

const WidgetBPage: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetB[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetB | null>(null);

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    const fetchedWidgets = await getWidgetsB();
    setWidgets(fetchedWidgets);
  };

  const handleCreateWidget = async () => {
    // Note: We're using a hardcoded widgetAId here. In a real application,
    // you'd want to select or input this dynamically.
    const newWidget = await createWidgetB({ 
      name: `New Widget B ${Date.now()}`, 
      description: 'A new widget B', 
      widgetAId: 1 
    });
    setWidgets([...widgets, newWidget]);
  };

  const handleSelectWidget = (widget: WidgetB) => {
    setSelectedWidget(widget);
  };

  return (
    <div>
      <Typography variant="h4">Widgets B</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateWidget}>
        Create Widget B
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <WidgetBList widgets={widgets} onSelectWidget={handleSelectWidget} />
        </Grid>
        <Grid item xs={6}>
          {selectedWidget && <WidgetBDetail widget={selectedWidget} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default WidgetBPage;