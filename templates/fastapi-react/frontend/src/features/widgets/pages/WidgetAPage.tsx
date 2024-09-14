import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Typography, Grid, Pagination, Alert, CircularProgress } from '@mui/material';
import WidgetAList from '../components/WidgetAList';
import WidgetADetail from '../components/WidgetADetail';
import WidgetAForm from '../components/WidgetAForm';
import { getWidgetsA, createWidgetA, updateWidgetA, deleteWidgetA } from '../api';
import { WidgetA, WidgetACreate, PaginatedResponse } from '../../../types';
import { StyledPaper, StyledButton } from '../../../StyledComponents';

const WidgetAPage: React.FC = () => {
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetA> | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<WidgetA | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const editFormRef = useRef<HTMLDivElement>(null);

  const fetchWidgets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getWidgetsA(paginatedWidgets?.page || 1, paginatedWidgets?.page_size || 10);
      console.log('Fetched widgets response:', response);
      setPaginatedWidgets(response);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch widgets:', error);
      setError('Failed to fetch widgets. Please try again.');
      setPaginatedWidgets(null);
    } finally {
      setIsLoading(false);
    }
  }, [paginatedWidgets?.page, paginatedWidgets?.page_size]);

  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  const handleCreateOrUpdateWidget = async (widgetData: WidgetACreate) => {
    console.log('handleCreateOrUpdateWidget called with:', widgetData);
    setIsLoading(true);
    try {
      let updatedWidget: WidgetA;
      if (selectedWidget) {
        updatedWidget = await updateWidgetA(selectedWidget.id, widgetData);
      } else {
        updatedWidget = await createWidgetA(widgetData);
      }
      console.log('Widget created/updated:', updatedWidget);
      await fetchWidgets();
      setSelectedWidget(null);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Error creating/updating widget:', error);
      setError('An error occurred while creating/updating the widget. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectWidget = (widget: WidgetA) => {
    setSelectedWidget(widget);
    setIsEditing(false);
  };

  const handleEditWidget = (widget: WidgetA) => {
    setSelectedWidget(widget);
    setIsEditing(true);
    // Scroll to the edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDeleteWidget = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteWidgetA(id);
      await fetchWidgets();
      if (selectedWidget && selectedWidget.id === id) {
        setSelectedWidget(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error deleting widget:', error);
      setError('An error occurred while deleting the widget. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginatedWidgets(prev => prev ? { ...prev, page: value } : null);
  };

  return (
    <StyledPaper>
      <Typography variant="h4">Widgets A</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {isLoading ? (
            <CircularProgress />
          ) : paginatedWidgets && paginatedWidgets.items.length > 0 ? (
            <>
              <WidgetAList
                paginatedWidgets={paginatedWidgets}
                onSelectWidget={handleSelectWidget}
                onEditWidget={handleEditWidget}
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
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedWidget(null);
              setIsEditing(true);
            }}
          >
            Create New Widget A
          </StyledButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <div ref={editFormRef}>
            {isEditing ? (
              <WidgetAForm
                onSubmit={handleCreateOrUpdateWidget}
                initialData={selectedWidget}
              />
            ) : selectedWidget ? (
              <WidgetADetail widget={selectedWidget} onEdit={() => handleEditWidget(selectedWidget)} />
            ) : null}
          </div>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default WidgetAPage;