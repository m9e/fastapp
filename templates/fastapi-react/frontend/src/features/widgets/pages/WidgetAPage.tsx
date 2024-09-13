import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Grid, Pagination } from '@mui/material';
import WidgetAList from '../components/WidgetAList';
import WidgetADetail from '../components/WidgetADetail';
import WidgetAForm from '../components/WidgetAForm';
import { getWidgetsA, createWidgetA, updateWidgetA, deleteWidgetA } from '../api';
import { WidgetA, PaginatedResponse, WidgetACreate } from '../../../types';
import { StyledPaper, StyledButton } from '../../../StyledComponents';

const WidgetAPage: React.FC = () => {
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetA> | null>(null);  // Use null as the initial value
  const [selectedWidget, setSelectedWidget] = useState<WidgetA | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchWidgets = useCallback(async () => {
    try {
      const response = await getWidgetsA(paginatedWidgets?.page || 1, paginatedWidgets?.pageSize || 10);
      setPaginatedWidgets(response);
    } catch (error) {
      console.error('Failed to fetch widgets:', error);
      setPaginatedWidgets({
        items: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      });
    }
  }, [paginatedWidgets?.page, paginatedWidgets?.pageSize]);

  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  const handleCreateWidget = async (widget: WidgetACreate) => {
    await createWidgetA(widget);
    fetchWidgets();
    setIsEditing(false);
  };

  const handleUpdateWidget = async (id: number, widget: WidgetACreate) => {
    await updateWidgetA(id, widget);
    fetchWidgets();
    setSelectedWidget(null);
    setIsEditing(false);
  };

  const handleDeleteWidget = async (id: number) => {
    await deleteWidgetA(id);
    fetchWidgets();
    if (selectedWidget && selectedWidget.id === id) {
      setSelectedWidget(null);
    }
  };

  const handleSelectWidget = (widget: WidgetA) => {
    setSelectedWidget(widget);
    setIsEditing(false);
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

  // Add conditional rendering to prevent accessing undefined properties
// Before
    if (!paginatedWidgets) {
      return <Typography>Loading...</Typography>;
    }

    // After
    if (!paginatedWidgets) {
      return (
        <StyledPaper>
          <Typography>No widgets available.</Typography>
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
        </StyledPaper>
      );
    }
  

  return (
    <StyledPaper>
      <Typography variant="h4">Widgets A</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <WidgetAList
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
          {isEditing ? (
            <WidgetAForm
              onSubmit={selectedWidget ? (widget) => handleUpdateWidget(selectedWidget.id, widget) : handleCreateWidget}
              initialData={selectedWidget}
            />
          ) : selectedWidget ? (
            <WidgetADetail widget={selectedWidget} onEdit={() => setIsEditing(true)} />
          ) : null}
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default WidgetAPage;