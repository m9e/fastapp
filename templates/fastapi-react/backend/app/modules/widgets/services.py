from sqlalchemy.orm import Session
from . import models, schemas
from typing import Tuple, List, Optional

class WidgetService:
    @staticmethod
    def create_widget_a(db: Session, widget: schemas.WidgetACreate) -> models.WidgetA:
        db_widget = models.WidgetA(**widget.dict())
        db.add(db_widget)
        db.commit()
        db.refresh(db_widget)
        return db_widget

    @staticmethod
    def get_widget_a(db: Session, widget_id: int) -> Optional[models.WidgetA]:
        return db.query(models.WidgetA).filter(models.WidgetA.id == widget_id).first()

    @staticmethod
    def get_widget_as(db: Session, skip: int = 0, limit: int = 100) -> Tuple[List[models.WidgetA], int]:
        total = db.query(models.WidgetA).count()
        widgets = db.query(models.WidgetA).offset(skip).limit(limit).all()
        return widgets, total

    @staticmethod
    def update_widget_a(db: Session, widget_id: int, widget: schemas.WidgetAUpdate) -> Optional[models.WidgetA]:
        db_widget = db.query(models.WidgetA).filter(models.WidgetA.id == widget_id).first()
        if db_widget:
            for key, value in widget.dict(exclude_unset=True).items():
                setattr(db_widget, key, value)
            db.commit()
            db.refresh(db_widget)
        return db_widget

    @staticmethod
    def delete_widget_a(db: Session, widget_id: int) -> Optional[models.WidgetA]:
        db_widget = db.query(models.WidgetA).filter(models.WidgetA.id == widget_id).first()
        if db_widget:
            db.delete(db_widget)
            db.commit()
        return db_widget

    @staticmethod
    def create_widget_b(db: Session, widget: schemas.WidgetBCreate) -> models.WidgetB:
        db_widget = models.WidgetB(**widget.dict())
        db.add(db_widget)
        db.commit()
        db.refresh(db_widget)
        return db_widget

    @staticmethod
    def get_widget_b(db: Session, widget_id: int) -> Optional[models.WidgetB]:
        return db.query(models.WidgetB).filter(models.WidgetB.id == widget_id).first()

    @staticmethod
    def get_widget_bs(db: Session, skip: int = 0, limit: int = 100) -> Tuple[List[models.WidgetB], int]:
        total = db.query(models.WidgetB).count()
        widgets = db.query(models.WidgetB).offset(skip).limit(limit).all()
        return widgets, total

    @staticmethod
    def update_widget_b(db: Session, widget_id: int, widget: schemas.WidgetBUpdate) -> Optional[models.WidgetB]:
        db_widget = db.query(models.WidgetB).filter(models.WidgetB.id == widget_id).first()
        if db_widget:
            for key, value in widget.dict(exclude_unset=True).items():
                setattr(db_widget, key, value)
            db.commit()
            db.refresh(db_widget)
        return db_widget

    @staticmethod
    def delete_widget_b(db: Session, widget_id: int) -> Optional[models.WidgetB]:
        db_widget = db.query(models.WidgetB).filter(models.WidgetB.id == widget_id).first()
        if db_widget:
            db.delete(db_widget)
            db.commit()
        return db_widget