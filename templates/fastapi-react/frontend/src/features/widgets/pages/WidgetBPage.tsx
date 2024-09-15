import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Grid, Pagination } from '@mui/material';
import WidgetBList from '../components/WidgetBList';
import WidgetBDetail from '../components/WidgetBDetail';
import WidgetBForm from '../components/WidgetBForm';
import { getWidgetsB, createWidgetB, deleteWidgetB, getWidgetsA } from '../api';
import { WidgetB, PaginatedResponse, WidgetBCreate, WidgetA } from '../../../types';

const WidgetBPage: React.FC = () => {
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetB> | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<WidgetB | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [widgetAs, setWidgetAs] = useState<WidgetA[]>([]);

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
    fetchWidgetAs();
  }, [fetchWidgets]);

  const fetchWidgetAs = async () => {
    try {
      const response = await getWidgetsA(1, 100); // Adjust pagination as needed
      setWidgetAs(response.items);
    } catch (error) {
      console.error('Failed to fetch Widget As:', error);
    }
  };

  const handleCreateWidget = async (widgetData: WidgetBCreate) => {
    try {
      const newWidget = await createWidgetB(widgetData);
      fetchWidgets();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating Widget B:', error);
    }
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
      <Button variant="contained" color="primary" onClick={() => setIsCreating(true)}>
        Create Widget B
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <WidgetBList 
            paginatedWidgets={paginatedWidgets}
            onSelectWidget={handleSelectWidget}
            onDeleteWidget={handleDeleteWidget}
          />
          {paginatedWidgets && (
            <Pagination 
              count={paginatedWidgets.total_pages} 
              page={paginatedWidgets.page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {isCreating ? (
            <WidgetBForm onSubmit={handleCreateWidget} widgetAs={widgetAs} />
          ) : selectedWidget ? (
            <WidgetBDetail widget={selectedWidget} />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default WidgetBPage;