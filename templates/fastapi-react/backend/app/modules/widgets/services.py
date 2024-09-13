from sqlalchemy.orm import Session
from . import models, schemas

class WidgetService:
    @staticmethod
    def create_widget_a(db: Session, widget: schemas.WidgetACreate):
        db_widget = models.WidgetA(**widget.dict())
        db.add(db_widget)
        db.commit()
        db.refresh(db_widget)
        return db_widget

    @staticmethod
    def get_widget_a(db: Session, widget_id: int):
        return db.query(models.WidgetA).filter(models.WidgetA.id == widget_id).first()

    @staticmethod
    def get_widget_as(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.WidgetA).offset(skip).limit(limit).all()

    @staticmethod
    def create_widget_b(db: Session, widget: schemas.WidgetBCreate):
        db_widget = models.WidgetB(**widget.dict())
        db.add(db_widget)
        db.commit()
        db.refresh(db_widget)
        return db_widget

    @staticmethod
    def get_widget_b(db: Session, widget_id: int):
        return db.query(models.WidgetB).filter(models.WidgetB.id == widget_id).first()

    @staticmethod
    def get_widget_bs(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.WidgetB).offset(skip).limit(limit).all()