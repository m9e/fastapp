import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Pagination } from '@mui/material';
import WidgetBList from '../components/WidgetBList';
import WidgetBDetail from '../components/WidgetBDetail';
import { getWidgetsB, createWidgetB, deleteWidgetB } from '../api';
import { WidgetB } from '../../../types';

const ITEMS_PER_PAGE = 10;

const WidgetBPage: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetB[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetB | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchWidgets();
  }, [page]);

  const fetchWidgets = async () => {
    const response = await getWidgetsB(page, ITEMS_PER_PAGE);
    setWidgets(response.items);
    setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));
  };

  const handleCreateWidget = async () => {
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

  const handleDeleteWidget = async (id: number) => {
    await deleteWidgetB(id);
    setWidgets(widgets.filter(w => w.id !== id));
    if (selectedWidget && selectedWidget.id === id) {
      setSelectedWidget(null);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Typography variant="h4">Widgets B</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateWidget}>
        Create Widget B
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <WidgetBList 
            widgets={widgets} 
            onSelectWidget={handleSelectWidget}
            onDeleteWidget={handleDeleteWidget}
          />
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Grid>
        <Grid item xs={6}>
          {selectedWidget && <WidgetBDetail widget={selectedWidget} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default WidgetBPage;