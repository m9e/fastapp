export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface WidgetACreate {
  name: string;
  description?: string | null;
}

export interface WidgetA extends WidgetACreate {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface WidgetBCreate {
  name: string;
  description?: string;
  widget_a_id?: number;  // Changed from widgetAId to widget_a_id
}

export interface WidgetB extends WidgetBCreate {
  id: number;
  created_at: string;
  updated_at: string;
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