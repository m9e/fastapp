from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from . import schemas, services
from math import ceil

router = APIRouter()

@router.post("/widget-a", response_model=schemas.ApiResponse[schemas.WidgetA])
def create_widget_a(widget: schemas.WidgetACreate, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.create_widget_a(db, widget)
    return schemas.ApiResponse(data=db_widget, message="Widget A created successfully")

@router.get("/widget-a", response_model=schemas.ApiResponse[schemas.PaginatedResponse[schemas.WidgetA]])
def read_widget_as(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    widgets = services.WidgetService.get_widget_as(db, skip=(page-1)*limit, limit=limit)
    total = services.WidgetService.count_widget_as(db)
    total_pages = ceil(total / limit)
    paginated_response = schemas.PaginatedResponse(
        items=widgets,
        total=total,
        page=page,
        page_size=limit,
        total_pages=total_pages
    )
    return schemas.ApiResponse(data=paginated_response, message="Widgets A fetched successfully")

@router.get("/widget-a/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetA])
def read_widget_a(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.get_widget_a(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget A not found")
    return schemas.ApiResponse(data=db_widget, message="Widget A fetched successfully")

@router.put("/widget-a/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetA])
def update_widget_a(widget_id: int, widget: schemas.WidgetAUpdate, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.update_widget_a(db, widget_id=widget_id, widget=widget)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget A not found")
    return schemas.ApiResponse(data=db_widget, message="Widget A updated successfully")

@router.delete("/widget-a/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetA])
def delete_widget_a(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.delete_widget_a(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget A not found")
    return schemas.ApiResponse(data=db_widget, message="Widget A deleted successfully")

@router.post("/widget-b", response_model=schemas.ApiResponse[schemas.WidgetB])
def create_widget_b(widget: schemas.WidgetBCreate, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.create_widget_b(db, widget)
    return schemas.ApiResponse(data=db_widget, message="Widget B created successfully")

@router.get("/widget-b", response_model=schemas.ApiResponse[schemas.PaginatedResponse[schemas.WidgetB]])
def read_widget_bs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    widget_a_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    widgets = services.WidgetService.get_widget_bs(db, skip=(page-1)*limit, limit=limit, widget_a_id=widget_a_id)
    total = services.WidgetService.count_widget_bs(db, widget_a_id=widget_a_id)
    total_pages = ceil(total / limit)
    paginated_response = schemas.PaginatedResponse(
        items=widgets,
        total=total,
        page=page,
        page_size=limit,
        total_pages=total_pages
    )
    return schemas.ApiResponse(data=paginated_response, message="Widgets B fetched successfully")

@router.get("/widget-b/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetB])
def read_widget_b(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.get_widget_b(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget B not found")
    return schemas.ApiResponse(data=db_widget, message="Widget B fetched successfully")

@router.put("/widget-b/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetB])
def update_widget_b(widget_id: int, widget: schemas.WidgetBUpdate, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.update_widget_b(db, widget_id=widget_id, widget=widget)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget B not found")
    return schemas.ApiResponse(data=db_widget, message="Widget B updated successfully")

@router.delete("/widget-b/{widget_id}", response_model=schemas.ApiResponse[schemas.WidgetB])
def delete_widget_b(widget_id: int, db: Session = Depends(get_db)):
    db_widget = services.WidgetService.delete_widget_b(db, widget_id=widget_id)
    if db_widget is None:
        raise HTTPException(status_code=404, detail="Widget B not found")
    return schemas.ApiResponse(data=db_widget, message="Widget B deleted successfully")