import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Pagination } from '@mui/material';
import WidgetAList from '../components/WidgetAList';
import WidgetADetail from '../components/WidgetADetail';
import WidgetAForm from '../components/WidgetAForm';
import { getWidgetsA, createWidgetA, updateWidgetA, deleteWidgetA } from '../api';
import { WidgetA } from '../../../types';
import { StyledPaper, StyledButton } from '../../../StyledComponents';

const ITEMS_PER_PAGE = 10;

const WidgetAPage: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetA[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetA | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchWidgets();
  }, [page]);

  const fetchWidgets = async () => {
    const response = await getWidgetsA(page, ITEMS_PER_PAGE);
    setWidgets(response.items);
    setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));
  };

  const handleCreateWidget = async (widget: Omit<WidgetA, 'id'>) => {
    const newWidget = await createWidgetA(widget);
    setWidgets([...widgets, newWidget]);
    setIsEditing(false);
  };

  const handleUpdateWidget = async (id: number, widget: Partial<WidgetA>) => {
    const updatedWidget = await updateWidgetA(id, widget);
    setWidgets(widgets.map(w => w.id === id ? updatedWidget : w));
    setSelectedWidget(updatedWidget);
    setIsEditing(false);
  };

  const handleDeleteWidget = async (id: number) => {
    await deleteWidgetA(id);
    setWidgets(widgets.filter(w => w.id !== id));
    if (selectedWidget && selectedWidget.id === id) {
      setSelectedWidget(null);
    }
  };

  const handleSelectWidget = (widget: WidgetA) => {
    setSelectedWidget(widget);
    setIsEditing(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <StyledPaper>
      <Typography variant="h4">Widgets A</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <WidgetAList 
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
              onSubmit={selectedWidget ? 
                (widget) => handleUpdateWidget(selectedWidget.id, widget) : 
                handleCreateWidget
              }
              initialData={selectedWidget}
            />
          ) : selectedWidget ? (
            <WidgetADetail 
              widget={selectedWidget}
              onEdit={() => setIsEditing(true)}
            />
          ) : null}
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default WidgetAPage;