from pydantic import BaseModel, Field
from typing import List, Generic, TypeVar, Optional
from datetime import datetime

T = TypeVar('T')

class WidgetABase(BaseModel):
    name: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=200)

class WidgetACreate(BaseModel):
    name: str = Field(..., max_length=50)
    description: str | None = Field(None, max_length=200)

class WidgetAUpdate(WidgetABase):
    pass

class WidgetA(WidgetABase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class WidgetBBase(BaseModel):
    name: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=200)
    widget_a_id: Optional[int] = None

class WidgetBCreate(WidgetBBase):
    pass

class WidgetBUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=50)
    description: Optional[str] = Field(None, max_length=200)
    widget_a_id: Optional[int] = None

class WidgetB(WidgetBBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

T = TypeVar('T')

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int

    model_config = {
        "from_attributes": True  # Enables population from ORM models like SQLAlchemy
    }