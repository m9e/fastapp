// Base interfaces
interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface BaseWidgetA {
  name: string;
  description?: string;
}

interface BaseWidgetB {
  name: string;
  description?: string;
  widgetAId: number;
}

// Main entity interfaces
export interface WidgetA extends BaseEntity, BaseWidgetA {}

export interface WidgetB extends BaseEntity, BaseWidgetB {}

// Create interfaces
export interface WidgetACreate extends BaseWidgetA {}

export interface WidgetBCreate extends BaseWidgetB {}

// Update interfaces
export type WidgetAUpdate = Partial<BaseWidgetA>;
export type WidgetBUpdate = Partial<BaseWidgetB>;

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API response interfaces
export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}