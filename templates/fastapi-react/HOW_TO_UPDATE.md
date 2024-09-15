# Guide: How to Modify and Extend Resources

This guide will help you understand how to add a new resource (WidgetC) and establish a relationship (WidgetC -> WidgetA) in the FastAPI-React template. The template is structured to provide a full-stack example, demonstrating the flow from the frontend to the database layer.

## Overview of Steps

1. Define the Database Model
2. Create Pydantic Schemas
3. Implement CRUD Services
4. Create API Endpoints
5. Update the Frontend Type Definitions
6. Implement Frontend API Calls
7. Create Frontend Components
8. Update Navigation and Routes
9. Run Database Migrations

## 1. Define the Database Model

**File**: `backend/app/modules/widgets/models.py`

Add the WidgetC model:

```python
class WidgetC(Base):
    __tablename__ = "widgets_c"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    widget_a_id = Column(Integer, ForeignKey("widgets_a.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    widget_a = relationship("WidgetA", back_populates="widget_cs")

# Update WidgetA to include the relationship
class WidgetA(Base):
    # ... existing fields ...
    widget_bs = relationship("WidgetB", back_populates="widget_a")
    widget_cs = relationship("WidgetC", back_populates="widget_a")
```

## 2. Create Pydantic Schemas

**File**: `backend/app/modules/widgets/schemas.py`

Add schemas for WidgetC:

```python
class WidgetCBase(BaseModel):
    name: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=200)
    widget_a_id: int

class WidgetCCreate(WidgetCBase):
    pass

class WidgetCUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=50)
    description: Optional[str] = Field(None, max_length=200)
    widget_a_id: Optional[int] = None

class WidgetC(WidgetCBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
```

## 3. Implement CRUD Services

**File**: `backend/app/modules/widgets/services.py`

Add methods for WidgetC:

```python
class WidgetService:
    # ... existing methods ...

    @staticmethod
    def create_widget_c(db: Session, widget: schemas.WidgetCCreate) -> models.WidgetC:
        db_widget = models.WidgetC(**widget.dict())
        db.add(db_widget)
        db.commit()
        db.refresh(db_widget)
        return db_widget

    @staticmethod
    def get_widget_c(db: Session, widget_id: int) -> Optional[models.WidgetC]:
        return db.query(models.WidgetC).filter(models.WidgetC.id == widget_id).first()

    @staticmethod
    def get_widget_cs(db: Session, skip: int = 0, limit: int = 100) -> List[models.WidgetC]:
        return db.query(models.WidgetC).offset(skip).limit(limit).all()

    @staticmethod
    def count_widget_cs(db: Session) -> int:
        return db.query(models.WidgetC).count()

    @staticmethod
    def update_widget_c(db: Session, widget_id: int, widget: schemas.WidgetCUpdate) -> Optional[models.WidgetC]:
        db_widget = db.query(models.WidgetC).filter(models.WidgetC.id == widget_id).first()
        if db_widget:
            for key, value in widget.dict(exclude_unset=True).items():
                setattr(db_widget, key, value)
            db.commit()
            db.refresh(db_widget)
        return db_widget

    @staticmethod
    def delete_widget_c(db: Session, widget_id: int) -> Optional[models.WidgetC]:
        db_widget = db.query(models.WidgetC).filter(models.WidgetC.id == widget_id).first()
        if db_widget:
            db.delete(db_widget)
            db.commit()
        return db_widget
```

## 4. Create API Endpoints

**File**: `backend/app/modules/widgets/api.py`

Add routes for WidgetC:

```python
@router.post("/widget-c", response_model=schemas.ApiResponse[schemas.WidgetC])
def create_widget_c(widget: schemas.WidgetCCreate, db: Session = Depends(get_db)):
    return services.WidgetService.create_widget_c(db, widget)

@router.get("/widget-c", response_model=schemas.ApiResponse[schemas.PaginatedResponse[schemas.WidgetC]])
def read_widget_cs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    widgets = services.WidgetService.get_widget_cs(db, skip=(page-1)*limit, limit=limit)
    total = services.WidgetService.count_widget_cs(db)
    total_pages = ceil(total / limit)
    return schemas.PaginatedResponse(
        items=widgets,
        total=total,
        page=page,
        page_size=limit,
        total_pages=total_pages
    )

@router.get("/widget-c/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetC])
def read_widget_c(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.get_widget_c(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget C not found")
    return db_widget

@router.put("/widget-c/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetC])
def update_widget_c(widget_id: int, widget: schemas.WidgetCUpdate, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.update_widget_c(db, widget_id=widget_id, widget=widget)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget C not found")
    return db_widget

@router.delete("/widget-c/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetC])
def delete_widget_c(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.delete_widget_c(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget C not found")
    return db_widget
```

Note: The API responses are not wrapped in a `data` field. The response models directly match the schema definitions.

## 5. Update the Frontend Type Definitions

**File**: `frontend/src/types/index.ts`

Add interfaces for WidgetC:

```typescript
export interface WidgetCCreate {
  name: string;
  description?: string | null;
  widget_a_id: number;
}

export interface WidgetC extends WidgetCCreate {
  id: number;
  created_at: string;
  updated_at: string;
}

export type WidgetCUpdate = Partial<WidgetCCreate>;
```

Note the use of snake_case for `widget_a_id` to match the backend schema.

## 6. Implement Frontend API Calls

**File**: `frontend/src/features/widgets/api.ts`

Add API functions for WidgetC:

```typescript

export const getWidgetsC = async (page: number, limit: number): Promise<PaginatedResponse<WidgetC>> => {
  try {
    const response = await axios.get<ApiResponse<PaginatedResponse<WidgetC>>>(`${API_URL}/widget-c`, {
      params: { page, limit }
    });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createWidgetC = async (widget: WidgetCCreate): Promise<WidgetC> => {
  try {
    const response = await axios.post<ApiResponse<WidgetC>>(`${API_URL}/widget-c`, widget);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    throw handleApiError(error);
  }
};

```

// In src/features/widgets/api.ts

```typescript
export const getWidgetC = async (id: number): Promise<WidgetC> => {
  try {
    const response = await axios.get<ApiResponse<WidgetC>>(`${API_URL}/widget-c/${id}`);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateWidgetC = async (id: number, widget: WidgetCUpdate): Promise<WidgetC> => {
  try {
    const response = await axios.put<ApiResponse<WidgetC>>(`${API_URL}/widget-c/${id}`, widget);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteWidgetC = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/widget-c/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};
```

Error handling:
```typescript
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data) {
      return error.response.data as ApiError;
    }
    return { message: error.message };
  }
  return { message: 'An unexpected error occurred' };
};
```

## 7. Create Frontend Components

Create the following components in `frontend/src/features/widgets/components/`:

- `WidgetCList.tsx`
- `WidgetCDetail.tsx`
- `WidgetCForm.tsx`

And create `WidgetCPage.tsx` in `frontend/src/features/widgets/pages/`.

Example of `WidgetCPage.tsx` with pagination:

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Grid, Pagination } from '@mui/material';
import WidgetCList from '../components/WidgetCList';
import WidgetCDetail from '../components/WidgetCDetail';
import WidgetCForm from '../components/WidgetCForm';
import { getWidgetsC, createWidgetC, updateWidgetC, deleteWidgetC } from '../api';
import { WidgetC, PaginatedResponse } from '../../../types';
import { StyledPaper, StyledButton } from '../../../StyledComponents';

const WidgetCPage: React.FC = () => {
  const [paginatedWidgets, setPaginatedWidgets] = useState<PaginatedResponse<WidgetC> | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<WidgetC | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWidgets = useCallback(async (page: number = 1, limit: number = 10) => {
    try {
      const response = await getWidgetsC(page, limit);
      setPaginatedWidgets(response);
      setError(null);
    } catch (error) {
      setError('Failed to fetch widgets. Please try again.');
      setPaginatedWidgets(null);
    }
  }, []);

  useEffect(() => {
    fetchWidgets();
  }, [fetchWidgets]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (paginatedWidgets) {
      fetchWidgets(value, paginatedWidgets.page_size);
    }
  };

// In src/features/widgets/pages/WidgetCPage.tsx

const handleCreateWidget = async (widget: WidgetCCreate) => {
  try {
    const newWidget = await createWidgetC(widget);
    setPaginatedWidgets(prev => prev ? {
      ...prev,
      items: [...prev.items, newWidget],
      total: prev.total + 1
    } : null);
    setSelectedWidget(newWidget);
    setIsEditing(false);
    setError(null);
  } catch (error) {
    setError('Failed to create widget. Please try again.');
  }
};

const handleUpdateWidget = async (id: number, widget: WidgetCUpdate) => {
  try {
    const updatedWidget = await updateWidgetC(id, widget);
    setPaginatedWidgets(prev => prev ? {
      ...prev,
      items: prev.items.map(item => item.id === id ? updatedWidget : item)
    } : null);
    setSelectedWidget(updatedWidget);
    setIsEditing(false);
    setError(null);
  } catch (error) {
    setError('Failed to update widget. Please try again.');
  }
};

const handleDeleteWidget = async (id: number) => {
  try {
    await deleteWidgetC(id);
    setPaginatedWidgets(prev => prev ? {
      ...prev,
      items: prev.items.filter(item => item.id !== id),
      total: prev.total - 1
    } : null);
    if (selectedWidget && selectedWidget.id === id) {
      setSelectedWidget(null);
    }
    setError(null);
  } catch (error) {
    setError('Failed to delete widget. Please try again.');
  }
};

  return (
    <StyledPaper>
      <Typography variant="h4">Widgets C</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {paginatedWidgets && (
            <>
              <WidgetCList
                widgets={paginatedWidgets.items}
                onSelectWidget={setSelectedWidget}
                onDeleteWidget={handleDeleteWidget}
              />
              <Pagination
                count={paginatedWidgets.total_pages}
                page={paginatedWidgets.page}
                onChange={handlePageChange}
              />
            </>
          )}
          <StyledButton onClick={() => setIsEditing(true)}>
            Create New Widget C
          </StyledButton>
        </Grid>
        <Grid item xs={12} md={6}>
          {isEditing ? (
            <WidgetCForm
              onSubmit={selectedWidget ? handleUpdateWidget : handleCreateWidget}
              initialData={selectedWidget}
            />
          ) : selectedWidget ? (
            <WidgetCDetail
              widget={selectedWidget}
              onEdit={() => setIsEditing(true)}
            />
          ) : null}
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default WidgetCPage;
```

```typescript

// example of WidgetCForm.tsx

import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { WidgetC, WidgetCCreate, WidgetA } from '../../../types';
import { getWidgetsA } from '../api';

interface WidgetCFormProps {
  onSubmit: (widget: WidgetCCreate) => void;
  initialData?: WidgetC;
}

const WidgetCForm: React.FC<WidgetCFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [widgetAId, setWidgetAId] = useState<number | ''>(initialData?.widget_a_id || '');
  const [widgetAs, setWidgetAs] = useState<WidgetA[]>([]);

  useEffect(() => {
    const fetchWidgetAs = async () => {
      try {
        const response = await getWidgetsA(1, 100); // Fetch up to 100 WidgetAs
        setWidgetAs(response.items);
      } catch (error) {
        console.error('Failed to fetch WidgetAs', error);
      }
    };
    fetchWidgetAs();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      widget_a_id: widgetAId as number,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Widget A</InputLabel>
        <Select
          value={widgetAId}
          onChange={(e) => setWidgetAId(e.target.value as number)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {widgetAs.map((widgetA) => (
            <MenuItem key={widgetA.id} value={widgetA.id}>
              {widgetA.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {initialData ? 'Update' : 'Create'} Widget C
      </Button>
    </form>
  );
};

export default WidgetCForm;
```


## 8. Update Navigation and Routes

**File**: `frontend/src/App.tsx`

Add a route for `WidgetCPage`:

```tsx
import WidgetCPage from './features/widgets/pages/WidgetCPage';

// ...

<Routes>
  {/* ... existing routes ... */}
  <Route path="/widgets-c" element={<WidgetCPage />} />
</Routes>
```

**File**: `frontend/src/components/Layout/SubNav.tsx`

Add navigation link:

```tsx
<Button color="inherit" component={Link} to="/widgets-c">
  Widgets C
</Button>
```

## 9. Run Database Migrations

Generate a new Alembic migration:

```bash
cd backend
alembic revision --autogenerate -m "Add WidgetC model"
alembic upgrade head
```

Ensure that `WidgetC` is included in the metadata for Alembic to detect changes. Update `backend/app/db/base.py`:

```python
from app.db.session import Base
from app.modules.widgets.models import WidgetA, WidgetB, WidgetC

__all__ = ["Base", "WidgetA", "WidgetB", "WidgetC"]
```

## Conclusion

This guide provides a comprehensive overview of adding a new resource to the FastAPI-React template. Key points to remember:

1. Maintain consistency in naming conventions: use snake_case for backend and API interactions, and camelCase for frontend JavaScript/TypeScript variables.
2. API responses are not wrapped in a `data` field. The response structure directly matches the defined schemas.
3. Implement proper error handling using the `handleApiError` function in frontend API calls.
4. Ensure type consistency between backend Pydantic models and frontend TypeScript interfaces.
5. Implement pagination consistently across the backend and frontend.
6. When implementing relationships between resources (like WidgetC to WidgetA), ensure that:
   - The database model includes the appropriate foreign key and relationship definition.
   - The Pydantic schemas include the related field (e.g., `widget_a_id` in WidgetCCreate).
   - The frontend interfaces reflect this relationship.
   - API calls and components handle the relationship appropriately, allowing users to select the related WidgetA when creating or updating a WidgetC.

By following these guidelines, you can extend the template to add new resources and relationships while maintaining consistency and type safety across the full stack.