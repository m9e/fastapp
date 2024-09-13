import axios from 'axios';
import { WidgetA, WidgetACreate, WidgetB, WidgetBCreate, PaginatedResponse, ApiResponse, ApiError } from '../../types';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/widgets';
console.log('API_URL:', API_URL); // Add this line to check the API URL

// WidgetA functions
export const getWidgetsA = async (page: number, limit: number): Promise<PaginatedResponse<WidgetA>> => {
  try {
    const response = await axios.get<ApiResponse<PaginatedResponse<WidgetA>>>(`${API_URL}/widget-a`, {
      params: { page, limit }
    });
    console.log('API response:', response.data); // Add this line for debugging
    return response.data.data; // Make sure we're returning the data property of the response
  } catch (error) {
    console.error('Error fetching widgets:', error);
    throw error;
  }
};

export const createWidgetA = async (widget: WidgetACreate): Promise<WidgetA> => {
  try {
    console.log('Sending createWidgetA request with data:', widget);
    const response = await axios.post<ApiResponse<WidgetA>>(`${API_URL}/widget-a`, widget);
    console.log('createWidgetA response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error in createWidgetA:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
    }
    throw handleApiError(error);
  }
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

export const getWidgetsBByWidgetAId = async (
    widgetAId: number,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<WidgetB>> => {
    const response = await axios.get<ApiResponse<PaginatedResponse<WidgetB>>>(`${API_URL}/widget-b`, {
      params: { widgetAId, page, limit },
    });
    return response.data.data;
  };

export const createWidgetB = async (widget: WidgetBCreate): Promise<WidgetB> => {
  try {
    const response = await axios.post<ApiResponse<WidgetB>>(`${API_URL}/widget-b`, {
      ...widget,
      widget_a_id: widget.widgetAId // Convert to snake_case for the backend
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
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
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        return error.response.data as ApiError;
      }
      return { message: error.message };
    }
    return { message: 'An unexpected error occurred' };
  };