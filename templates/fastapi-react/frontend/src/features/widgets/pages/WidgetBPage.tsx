import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Grid, Pagination } from '@mui/material';
import WidgetBList from '../components/WidgetBList';
import WidgetBDetail from '../components/WidgetBDetail';
import { getWidgetsB, createWidgetB, deleteWidgetB } from '../api';
import { WidgetB, PaginatedResponse, WidgetBCreate } from '../../../types';

const WidgetBPage: React.FC = () => {
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetB>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1
  });
  const [selectedWidget, setSelectedWidget] = useState<WidgetB | null>(null);

  const fetchWidgets = useCallback(async () => {
    const response = await getWidgetsB(paginatedWidgets.page, paginatedWidgets.pageSize);
    setPaginatedWidgets(response);
  }, [paginatedWidgets.page, paginatedWidgets.pageSize]);

  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  const handleCreateWidget = async () => {
    const newWidget: WidgetBCreate = { 
        name: `New Widget B ${Date.now()}`, 
        description: 'A new widget B', 
        widgetAId: 1 // This should be dynamically set or selected by the user
    };
    await createWidgetB(newWidget);
    fetchWidgets();
  };

  const handleSelectWidget = (widget: WidgetB) => {
      setSelectedWidget(widget);
  };

  const handleDeleteWidget = async (id: number) => {
      await deleteWidgetB(id);
      fetchWidgets();
      if (selectedWidget && selectedWidget.id === id) {
          setSelectedWidget(null);
      }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPaginatedWidgets((prev: PaginatedResponse<WidgetB>) => ({
          ...prev,
          page: value || 1, // Ensure a valid fallback
      }));
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
            paginatedWidgets={paginatedWidgets}
            onSelectWidget={handleSelectWidget}
            onDeleteWidget={handleDeleteWidget}
          />
          <Pagination 
            count={paginatedWidgets.totalPages} 
            page={paginatedWidgets.page} 
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