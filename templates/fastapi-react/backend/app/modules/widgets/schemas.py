from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class WidgetABase(BaseModel):
    name: str
    description: Optional[str] = None

class WidgetACreate(WidgetABase):
    pass

class WidgetA(WidgetABase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class WidgetBBase(BaseModel):
    name: str
    description: Optional[str] = None
    widget_a_id: int

class WidgetBCreate(WidgetBBase):
    pass

class WidgetB(WidgetBBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class PaginatedResponse(BaseModel):
    items: List[BaseModel]
    total: int
    page: int
    page_size: int
    total_pages: int