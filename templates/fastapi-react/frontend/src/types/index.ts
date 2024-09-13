export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface WidgetACreate {
  name: string;
  description?: string;
}

export interface WidgetA extends WidgetACreate {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetBCreate {
  name: string;
  description?: string;
  widgetAId: number;
}

export interface WidgetB extends WidgetBCreate {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export type WidgetAUpdate = Partial<WidgetACreate>;
export type WidgetBUpdate = Partial<WidgetBCreate>;