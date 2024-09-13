from pydantic import BaseModel, Field
from typing import List, Optional, Generic, TypeVar
from datetime import datetime

T = TypeVar('T')

class WidgetABase(BaseModel):
    name: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=200)

class WidgetACreate(WidgetABase):
    pass

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
    widget_a_id: int

class WidgetBCreate(WidgetBBase):
    pass

class WidgetBUpdate(WidgetBBase):
    pass

class WidgetB(WidgetBBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int