from pydantic import BaseModel
from typing import List, Optional

class WidgetABase(BaseModel):
    name: str
    description: Optional[str] = None

class WidgetACreate(WidgetABase):
    pass

class WidgetA(WidgetABase):
    id: int

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

    class Config:
        orm_mode = True