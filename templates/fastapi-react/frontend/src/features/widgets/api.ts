import axios from 'axios';
import { WidgetA, WidgetACreate, WidgetB, WidgetBCreate, PaginatedResponse, ApiResponse, ApiError } from '../../types';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/widgets';
console.log('API_URL:', API_URL);

// WidgetA functions

export const getWidgetsA = async (page: number, limit: number): Promise<PaginatedResponse<WidgetA>> => {
    try {
      const response = await axios.get<PaginatedResponse<WidgetA>>(`${API_URL}/widget-a`, {
        params: { page, limit }
      });
      console.log('API response:', response.data);
      if (response.data && response.data.items) {
        const paginatedResponse = response.data;
        console.log('Parsed paginatedResponse:', paginatedResponse);
        return paginatedResponse;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching widgets:', error);
      throw handleApiError(error);
    }
  };

export const createWidgetA = async (widget: WidgetACreate): Promise<WidgetA> => {
  try {
    console.log('Sending createWidgetA request with data:', widget);
    const response = await axios.post<WidgetA>(`${API_URL}/widget-a`, widget);
    console.log('createWidgetA response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createWidgetA:', error);
    throw handleApiError(error);
  }
};

export const getWidgetA = async (id: number): Promise<WidgetA> => {
  try {
    const response = await axios.get<ApiResponse<WidgetA>>(`${API_URL}/widget-a/${id}`);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateWidgetA = async (id: number, widget: Partial<WidgetACreate>): Promise<WidgetA> => {
  try {
    const response = await axios.put<ApiResponse<WidgetA>>(`${API_URL}/widget-a/${id}`, widget);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteWidgetA = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/widget-a/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
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
    console.log('Sending createWidgetB request with data:', widget);
    const response = await axios.post<ApiResponse<WidgetB>>(`${API_URL}/widget-b`, {
      ...widget,
      widget_a_id: widget.widgetAId // Convert to snake_case for the backend
    });
    console.log('createWidgetB response:', response.data);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error in createWidgetB:', error);
    throw handleApiError(error);
  }
};

export const getWidgetsB = async (page: number, limit: number): Promise<PaginatedResponse<WidgetB>> => {
  try {
    const response = await axios.get<PaginatedResponse<WidgetB>>(`${API_URL}/widget-b`, {
      params: { page, limit }
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching widgets B:', error);
    throw handleApiError(error);
  }
};

export const updateWidgetB = async (id: number, widget: Partial<WidgetBCreate>): Promise<WidgetB> => {
  try {
    const response = await axios.put<ApiResponse<WidgetB>>(`${API_URL}/widget-b/${id}`, widget);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteWidgetB = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/widget-b/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
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