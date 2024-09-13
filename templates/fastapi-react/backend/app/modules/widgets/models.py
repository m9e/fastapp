from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class WidgetA(Base):
    __tablename__ = "widgets_a"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)

    widget_bs = relationship("WidgetB", back_populates="widget_a")

class WidgetB(Base):
    __tablename__ = "widgets_b"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    widget_a_id = Column(Integer, ForeignKey("widgets_a.id"))

    widget_a = relationship("WidgetA", back_populates="widget_bs")