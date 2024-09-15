import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Grid, Pagination, CircularProgress } from '@mui/material';
import WidgetBList from '../components/WidgetBList';
import WidgetBDetail from '../components/WidgetBDetail';
import WidgetBForm from '../components/WidgetBForm';
import { getWidgetsB, createWidgetB, deleteWidgetB, getWidgetsA, updateWidgetB, getWidgetA } from '../api';  // Add getWidgetA to the import
import { WidgetB, PaginatedResponse, WidgetBCreate, WidgetA } from '../../../types';

const WidgetBPage: React.FC = () => {
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetB> | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<WidgetB | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [widgetAs, setWidgetAs] = useState<WidgetA[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [associatedWidgetA, setAssociatedWidgetA] = useState<WidgetA | null>(null);

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

  const fetchAssociatedWidgetA = useCallback(async (widget_a_id: number | undefined | null) => {
    console.log('Fetching associated Widget A for ID:', widget_a_id);
    if (widget_a_id) {
      try {
        const associatedA = await getWidgetA(widget_a_id);
        console.log('Associated Widget A fetched:', associatedA);
        setAssociatedWidgetA(associatedA);
      } catch (error) {
        console.error('Error fetching associated Widget A:', error);
        setAssociatedWidgetA(null);
        if (error instanceof Error) {
          setError(`Failed to fetch associated Widget A: ${error.message}`);
        } else {
          setError('Failed to fetch associated Widget A. Please try again.');
        }
      }
    } else {
      console.log('No associated Widget A ID, setting to null');
      setAssociatedWidgetA(null);
    }
  }, []);

  const handleCreateWidget = async (widgetData: WidgetBCreate) => {
    try {
      const newWidget = await createWidgetB(widgetData);
      console.log('New widget created:', newWidget);
      await fetchWidgets();
      setIsCreating(false);
      setError(null);
      handleSelectWidget(newWidget);
    } catch (error) {
      console.error('Error creating Widget B:', error);
      setError('Failed to create widget. Please try again.');
    }
  };

  const handleEditWidget = (widget: WidgetB) => {
    setSelectedWidget(widget);
    setIsEditing(true);
  };

  const handleUpdateWidget = async (widgetData: WidgetBCreate) => {
    try {
      if (selectedWidget) {
        const updatedWidget = await updateWidgetB(selectedWidget.id, widgetData);
        console.log('Widget updated:', updatedWidget);
        await fetchWidgets();
        setSelectedWidget(updatedWidget);
        setIsEditing(false);
        setError(null);
        await fetchAssociatedWidgetA(updatedWidget.widget_a_id);  // Changed from widgetAId to widget_a_id
      }
    } catch (error) {
      console.error('Error updating Widget B:', error);
      if (error instanceof Error) {
        setError(`Failed to update widget: ${error.message}`);
      } else {
        setError('Failed to update widget. Please try again.');
      }
    }
  };

  const handleSelectWidget = useCallback(async (widget: WidgetB) => {
    console.log('Selected Widget B:', widget);
    setSelectedWidget(widget);
    setIsCreating(false);
    setIsEditing(false);
    console.log('Calling fetchAssociatedWidgetA with ID:', widget.widget_a_id);
    await fetchAssociatedWidgetA(widget.widget_a_id);
  }, [fetchAssociatedWidgetA]);

  useEffect(() => {
    if (selectedWidget) {
      console.log('Selected Widget changed, fetching associated Widget A');
      fetchAssociatedWidgetA(selectedWidget.widget_a_id);
    }
  }, [selectedWidget, fetchAssociatedWidgetA]);

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

  useEffect(() => {
    console.log('associatedWidgetA state changed:', associatedWidgetA);
  }, [associatedWidgetA]);

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
          ) : isEditing && selectedWidget ? (
            <WidgetBForm onSubmit={handleUpdateWidget} widgetAs={widgetAs} initialData={selectedWidget} />
          ) : selectedWidget ? (
            <>
              <Typography>Debug: Selected Widget B: {JSON.stringify(selectedWidget)}</Typography>
              <Typography>Debug: Associated Widget A: {JSON.stringify(associatedWidgetA)}</Typography>
              <WidgetBDetail
                widget={selectedWidget}
                onEdit={() => setIsEditing(true)}
                associatedWidgetA={associatedWidgetA}
              />
            </>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default WidgetBPage;