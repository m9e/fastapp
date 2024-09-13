# backend/app/modules/widgets/api.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from . import schemas, services

router = APIRouter()

# WidgetA CRUD operations
@router.post("/widget-a", response_model=schemas.WidgetA)
def create_widget_a(widget: schemas.WidgetACreate, db: Session = Depends(get_db)):
    return services.WidgetService.create_widget_a(db, widget)

@router.get("/widget-a/{widget_id}", response_model=schemas.WidgetA)
def read_widget_a(widget_id: int, db: Session = Depends(get_db)):
    widget = services.WidgetService.get_widget_a(db, widget_id)
    if widget is None:
        raise HTTPException(status_code=404, detail="WidgetA not found")
    return widget

@router.get("/widget-a", response_model=List[schemas.WidgetA])
def read_widget_as(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    widgets = services.WidgetService.get_widget_as(db, skip=skip, limit=limit)
    return widgets

@router.put("/widget-a/{widget_id}", response_model=schemas.WidgetA)
def update_widget_a(widget_id: int, widget: schemas.WidgetAUpdate, db: Session = Depends(get_db)):
    updated_widget = services.WidgetService.update_widget_a(db, widget_id, widget)
    if updated_widget is None:
        raise HTTPException(status_code=404, detail="WidgetA not found")
    return updated_widget

@router.delete("/widget-a/{widget_id}", response_model=schemas.WidgetA)
def delete_widget_a(widget_id: int, db: Session = Depends(get_db)):
    deleted_widget = services.WidgetService.delete_widget_a(db, widget_id)
    if deleted_widget is None:
        raise HTTPException(status_code=404, detail="WidgetA not found")
    return deleted_widget

# WidgetB CRUD operations
@router.post("/widget-b", response_model=schemas.WidgetB)
def create_widget_b(widget: schemas.WidgetBCreate, db: Session = Depends(get_db)):
    return services.WidgetService.create_widget_b(db, widget)

@router.get("/widget-b/{widget_id}", response_model=schemas.WidgetB)
def read_widget_b(widget_id: int, db: Session = Depends(get_db)):
    widget = services.WidgetService.get_widget_b(db, widget_id)
    if widget is None:
        raise HTTPException(status_code=404, detail="WidgetB not found")
    return widget

@router.get("/widget-b", response_model=List[schemas.WidgetB])
def read_widget_bs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    widgets = services.WidgetService.get_widget_bs(db, skip=skip, limit=limit)
    return widgets

@router.put("/widget-b/{widget_id}", response_model=schemas.WidgetB)
def update_widget_b(widget_id: int, widget: schemas.WidgetBUpdate, db: Session = Depends(get_db)):
    updated_widget = services.WidgetService.update_widget_b(db, widget_id, widget)
    if updated_widget is None:
        raise HTTPException(status_code=404, detail="WidgetB not found")
    return updated_widget

@router.delete("/widget-b/{widget_id}", response_model=schemas.WidgetB)
def delete_widget_b(widget_id: int, db: Session = Depends(get_db)):
    deleted_widget = services.WidgetService.delete_widget_b(db, widget_id)
    if deleted_widget is None:
        raise HTTPException(status_code=404, detail="WidgetB not found")
    return deleted_widget