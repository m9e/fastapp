export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number; // Changed from pageSize to page_size
  total_pages: number; // Changed from totalPages to total_pages
}

export interface WidgetACreate {
  name: string;
  description?: string | null;
}

export interface WidgetA extends WidgetACreate {
  id: number;
  created_at: string; // Changed from createdAt to created_at
  updated_at: string; // Changed from updatedAt to updated_at
}

export interface WidgetBCreate {
  name: string;
  description?: string | null;
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