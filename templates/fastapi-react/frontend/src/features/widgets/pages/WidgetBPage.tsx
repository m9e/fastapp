import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Grid, Pagination, CircularProgress } from '@mui/material';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWidgets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getWidgetsB(paginatedWidgets?.page || 1, paginatedWidgets?.page_size || 10);
      console.log('Fetched widgets response:', response);
      setPaginatedWidgets(response);
    } catch (error) {
      console.error('Failed to fetch Widget B data:', error);
      setError('Failed to fetch widgets. Please try again.');
      setPaginatedWidgets(null);
    } finally {
      setIsLoading(false);
    }
  }, [paginatedWidgets?.page, paginatedWidgets?.page_size]);

  useEffect(() => {
    fetchWidgets();
    fetchWidgetAs();
  }, [fetchWidgets]);

  const fetchWidgetAs = async () => {
    try {
      const response = await getWidgetsA(1, 100);
      setWidgetAs(response.items);
    } catch (error) {
      console.error('Failed to fetch Widget As:', error);
    }
  };

  const handleCreateWidget = async (widgetData: WidgetBCreate) => {
    try {
      const newWidget = await createWidgetB(widgetData);
      console.log('New widget created:', newWidget);
      await fetchWidgets();
      setIsCreating(false);
      setError(null);
    } catch (error) {
      console.error('Error creating Widget B:', error);
      setError('Failed to create widget. Please try again.');
    }
  };

  const handleSelectWidget = (widget: WidgetB) => {
    setSelectedWidget(widget);
    setIsCreating(false);
  };

  const handleDeleteWidget = async (id: number) => {
    try {
      await deleteWidgetB(id);
      fetchWidgets();
      if (selectedWidget && selectedWidget.id === id) {
        setSelectedWidget(null);
      }
    } catch (error) {
      console.error('Error deleting Widget B:', error);
      setError('Failed to delete widget. Please try again.');
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginatedWidgets(prev => prev ? { ...prev, page: value } : null);
  };

  return (
    <div>
      <Typography variant="h4">Widgets B</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={() => setIsCreating(true)}>
        Create Widget B
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {isLoading ? (
            <CircularProgress />
          ) : paginatedWidgets && paginatedWidgets.items.length > 0 ? (
            <>
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
            </>
          ) : (
            <Typography>No widgets found.</Typography>
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