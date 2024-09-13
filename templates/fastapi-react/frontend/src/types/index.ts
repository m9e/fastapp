export interface WidgetA {
    id: number;
    name: string;
    description: string;
  }
  
  export interface WidgetACreate {
    name: string;
    description: string;
  }
  
  export interface WidgetB {
    id: number;
    name: string;
    description: string;
    widgetAId: number;
  }
  
  export interface WidgetBCreate {
    name: string;
    description: string;
    widgetAId: number;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
  }