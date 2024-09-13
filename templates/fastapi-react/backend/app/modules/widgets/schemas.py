from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class WidgetABase(BaseModel):
    name: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=200)

class WidgetACreate(WidgetABase):
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

class WidgetB(WidgetBBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PaginatedResponse(BaseModel):
    items: List[BaseModel]
    total: int
    page: int
    page_size: int
    total_pages: int