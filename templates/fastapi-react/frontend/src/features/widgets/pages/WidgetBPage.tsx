import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Grid, Pagination, CircularProgress } from '@mui/material';
import WidgetBList from '../components/WidgetBList';
import WidgetBDetail from '../components/WidgetBDetail';
import WidgetBForm from '../components/WidgetBForm';
import { getWidgetsB, createWidgetB, deleteWidgetB, getWidgetsA, updateWidgetB, getWidgetA } from '../api';
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
      setPaginatedWidgets(response);
    } catch (error) {
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
    if (widget_a_id) {
      try {
        const associatedA = await getWidgetA(widget_a_id);
        setAssociatedWidgetA(associatedA);
      } catch (error) {
        setAssociatedWidgetA(null);
        setError('Failed to fetch associated Widget A. Please try again.');
      }
    } else {
      setAssociatedWidgetA(null);
    }
  }, []);

  const handleCreateWidget = async (widgetData: WidgetBCreate) => {
    try {
      const newWidget = await createWidgetB(widgetData);
      await fetchWidgets();
      setIsCreating(false);
      setError(null);
      handleSelectWidget(newWidget);
    } catch (error) {
      setError('Failed to create widget. Please try again.');
    }
  };

  const handleUpdateWidget = async (widgetData: WidgetBCreate) => {
    try {
      if (selectedWidget) {
        const updatedWidget = await updateWidgetB(selectedWidget.id, widgetData);
        await fetchWidgets();
        setSelectedWidget(updatedWidget);
        setIsEditing(false);
        setError(null);
        await fetchAssociatedWidgetA(updatedWidget.widget_a_id);
      }
    } catch (error) {
      setError('Failed to update widget. Please try again.');
    }
  };

  const handleSelectWidget = useCallback(async (widget: WidgetB) => {
    setSelectedWidget(widget);
    setIsCreating(false);
    setIsEditing(false);
    await fetchAssociatedWidgetA(widget.widget_a_id);
  }, [fetchAssociatedWidgetA]);

  useEffect(() => {
    if (selectedWidget) {
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
          ) : isEditing && selectedWidget ? (
            <WidgetBForm onSubmit={handleUpdateWidget} widgetAs={widgetAs} initialData={selectedWidget} />
          ) : selectedWidget ? (
            <WidgetBDetail
              widget={selectedWidget}
              onEdit={() => setIsEditing(true)}
              associatedWidgetA={associatedWidgetA}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default WidgetBPage;