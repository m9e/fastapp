import axios from 'axios';
import { WidgetA, WidgetACreate, WidgetB, WidgetBCreate, PaginatedResponse, ApiResponse, ApiError } from '../../types';

const API_URL = 'http://localhost:8000/api/widgets';

// WidgetA functions
export const getWidgetsA = async (page: number, limit: number): Promise<PaginatedResponse<WidgetA>> => {
  const response = await axios.get<ApiResponse<PaginatedResponse<WidgetA>>>(`${API_URL}/widget-a`, {
    params: { page, limit }
  });
  return response.data.data;
};

export const createWidgetA = async (widget: WidgetACreate): Promise<WidgetA> => {
  const response = await axios.post<ApiResponse<WidgetA>>(`${API_URL}/widget-a`, widget);
  return response.data.data;
};

export const getWidgetA = async (id: number): Promise<WidgetA> => {
  const response = await axios.get<ApiResponse<WidgetA>>(`${API_URL}/widget-a/${id}`);
  return response.data.data;
};

export const updateWidgetA = async (id: number, widget: Partial<WidgetACreate>): Promise<WidgetA> => {
  const response = await axios.put<ApiResponse<WidgetA>>(`${API_URL}/widget-a/${id}`, widget);
  return response.data.data;
};

export const deleteWidgetA = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/widget-a/${id}`);
};

// WidgetB functions
export const getWidgetsB = async (page: number, limit: number): Promise<PaginatedResponse<WidgetB>> => {
  const response = await axios.get<ApiResponse<PaginatedResponse<WidgetB>>>(`${API_URL}/widget-b`, {
    params: { page, limit }
  });
  return response.data.data;
};

export const createWidgetB = async (widget: WidgetBCreate): Promise<WidgetB> => {
  const response = await axios.post<ApiResponse<WidgetB>>(`${API_URL}/widget-b`, widget);
  return response.data.data;
};

export const getWidgetB = async (id: number): Promise<WidgetB> => {
  const response = await axios.get<ApiResponse<WidgetB>>(`${API_URL}/widget-b/${id}`);
  return response.data.data;
};

export const updateWidgetB = async (id: number, widget: Partial<WidgetBCreate>): Promise<WidgetB> => {
  const response = await axios.put<ApiResponse<WidgetB>>(`${API_URL}/widget-b/${id}`, widget);
  return response.data.data;
};

export const deleteWidgetB = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/widget-b/${id}`);
};

// Error handling
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data as ApiError;
  }
  return { message: 'An unexpected error occurred' };
};