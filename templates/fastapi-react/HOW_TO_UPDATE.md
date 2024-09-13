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
@router.post("/widget-c", response_model=schemas.WidgetC)
def create_widget_c(widget: schemas.WidgetCCreate, db: Session = Depends(get_db)):
    return services.WidgetService.create_widget_c(db, widget)

@router.get("/widget-c", response_model=schemas.PaginatedResponse[schemas.WidgetC])
def read_widget_cs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    widgets = services.WidgetService.get_widget_cs(db, skip=(page-1)*limit, limit=limit)
    total = services.WidgetService.count_widget_cs(db)
    total_pages = ceil(total / limit)
    return {
        "items": widgets,
        "total": total,
        "page": page,
        "page_size": limit,
        "total_pages": total_pages
    }

@router.get("/widget-c/{widget_id}", response_model=schemas.WidgetC)
def read_widget_c(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.get_widget_c(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget C not found")
    return db_widget

@router.put("/widget-c/{widget_id}", response_model=schemas.WidgetC)
def update_widget_c(widget_id: int, widget: schemas.WidgetCUpdate, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.update_widget_c(db, widget_id=widget_id, widget=widget)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget C not found")
    return db_widget

@router.delete("/widget-c/{widget_id}", response_model=schemas.WidgetC)
def delete_widget_c(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.delete_widget_c(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget C not found")
    return db_widget
```

## 5. Update the Frontend Type Definitions

**File**: `frontend/src/types/index.ts`

Add interfaces for WidgetC:

```ts
export interface WidgetCCreate {
  name: string;
  description?: string;
  widgetAId: number;
}

export interface WidgetC extends WidgetCCreate {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type WidgetCUpdate = Partial<WidgetCCreate>;
```

## 6. Implement Frontend API Calls

**File**: `frontend/src/features/widgets/api.ts`

Add API functions for WidgetC:

```ts
// WidgetC functions

export const getWidgetsC = async (
  page: number,
  limit: number
): Promise<PaginatedResponse<WidgetC>> => {
  const response = await axios.get<ApiResponse<PaginatedResponse<WidgetC>>>(`${API_URL}/widget-c`, {
    params: { page, limit },
  });
  return response.data.data;
};

export const createWidgetC = async (widget: WidgetCCreate): Promise<WidgetC> => {
  const response = await axios.post<ApiResponse<WidgetC>>(`${API_URL}/widget-c`, widget);
  return response.data.data;
};

// ... similarly for getWidgetC, updateWidgetC, deleteWidgetC
```

## 7. Create Frontend Components

- Pages: `WidgetCPage.tsx`
- Components: `WidgetCList.tsx`, `WidgetCDetail.tsx`, `WidgetCForm.tsx`

Follow the pattern used for WidgetA and WidgetB, adjusting for WidgetC.

**Example**: `WidgetCPage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
// ... import necessary components and types ...

const WidgetCPage: React.FC = () => {
  // State management and API calls similar to WidgetAPage.tsx
};

export default WidgetCPage;
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
  {/* ... */}
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

By following the steps outlined above, you can extend the template to add new resources and relationships, maintaining the structure and best practices established in the original codebase. This approach ensures consistency across the frontend and backend, making the application scalable and easier to maintain.

If you have any questions or need further assistance, feel free to ask!
