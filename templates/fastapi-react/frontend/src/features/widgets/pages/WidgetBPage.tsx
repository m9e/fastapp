import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Grid, Pagination } from '@mui/material';
import WidgetBList from '../components/WidgetBList';
import WidgetBDetail from '../components/WidgetBDetail';
import { getWidgetsB, createWidgetB, deleteWidgetB } from '../api';
import { WidgetB, PaginatedResponse, WidgetBCreate } from '../../../types';

const WidgetBPage: React.FC = () => {
  // Initialize with null to handle the loading state properly
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetB> | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<WidgetB | null>(null);

  const fetchWidgets = useCallback(async () => {
    try {
      const response = await getWidgetsB(paginatedWidgets?.page || 1, paginatedWidgets?.page_size || 10);
      setPaginatedWidgets(response);
    } catch (error) {
      console.error('Failed to fetch Widget B data:', error);
      setPaginatedWidgets({
        items: [],
        total: 0,
        page: 1,
        page_size: 10,
        total_pages: 1,
      });
    }
  }, [paginatedWidgets?.page, paginatedWidgets?.page_size]);

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
    setPaginatedWidgets((prev) => {
      if (!prev) {
        return null;  // Handle case when prev is null
      }
  
      return {
        ...prev,
        page: value || 1, // Ensure a valid fallback
      };
    });
  };

  // Add conditional rendering to ensure paginatedWidgets is fully loaded before rendering components
  if (!paginatedWidgets) {
    return <Typography>Loading...</Typography>;
  }

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
            count={paginatedWidgets.total_pages} 
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