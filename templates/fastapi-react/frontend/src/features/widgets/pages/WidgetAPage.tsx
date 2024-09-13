import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Grid, Pagination } from '@mui/material';
import WidgetAList from '../components/WidgetAList';
import WidgetADetail from '../components/WidgetADetail';
import WidgetAForm from '../components/WidgetAForm';
import { getWidgetsA, createWidgetA, updateWidgetA, deleteWidgetA } from '../api';
import { WidgetA, PaginatedResponse, WidgetACreate } from '../../../types';
import { StyledPaper, StyledButton } from '../../../StyledComponents';

const WidgetAPage: React.FC = () => {
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetA> | null>(null);
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

  const handleEditWidget = (widget: WidgetA) => {
    setSelectedWidget(widget);
    setIsEditing(true);
  };

  const handleCreateOrUpdateWidget = async (widget: WidgetA) => {
    if (selectedWidget) {
      await updateWidgetA(selectedWidget.id, widget);
    } else {
      await createWidgetA(widget);
    }
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
        return null;
      }
      return {
        ...prev,
        page: value,
      };
    });
  };

  return (
    <StyledPaper>
      <Typography variant="h4">Widgets A</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {paginatedWidgets && (
            <>
              <WidgetAList
                paginatedWidgets={paginatedWidgets}
                onSelectWidget={handleSelectWidget}
                onEditWidget={handleEditWidget}
                onDeleteWidget={handleDeleteWidget}
              />
              <Pagination
                count={paginatedWidgets.totalPages}
                page={paginatedWidgets.page}
                onChange={handlePageChange}
                color="primary"
              />
            </>
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
          {isEditing ? (
            <WidgetAForm
              onSubmit={handleCreateOrUpdateWidget}
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