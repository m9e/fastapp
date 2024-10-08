import axios from 'axios';
import { WidgetA, WidgetACreate, WidgetB, WidgetBCreate, PaginatedResponse, ApiResponse, ApiError } from '../../types';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/widgets';
console.log('API_URL:', API_URL);

// WidgetA functions

export const getWidgetsA = async (page: number, limit: number): Promise<PaginatedResponse<WidgetA>> => {
    try {
      const response = await axios.get<ApiResponse<PaginatedResponse<WidgetA>>>(`${API_URL}/widget-a`, {
        params: { page, limit }
      });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  };

export const createWidgetA = async (widget: WidgetACreate): Promise<WidgetA> => {
  try {
    const response = await axios.post<ApiResponse<WidgetA>>(`${API_URL}/widget-a`, widget);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWidgetA = async (id: number): Promise<WidgetA> => {
  try {
    const response = await axios.get<ApiResponse<WidgetA>>(`${API_URL}/widget-a/${id}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateWidgetA = async (id: number, widget: Partial<WidgetACreate>): Promise<WidgetA> => {
  try {
    const response = await axios.put<WidgetA>(`${API_URL}/widget-a/${id}`, widget);
    if (response.data) {
      return response.data;
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

export const getWidgetsBByWidgetAId = async (widget_a_id: number, page = 1, limit = 10): Promise<PaginatedResponse<WidgetB>> => {
  try {
    const response = await axios.get<ApiResponse<PaginatedResponse<WidgetB>>>(`${API_URL}/widget-b`, {
      params: { widget_a_id, page, limit }
    });
    console.log('getWidgetsBByWidgetAId response:', response.data);
    if (!response.data || !response.data.data || !response.data.data.items) {
      throw new Error('Invalid response structure');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching widgets B by widget_a_id:', error);
    throw error; // Re-throw the error instead of returning a default response
  }
};

export const createWidgetB = async (widget: WidgetBCreate): Promise<WidgetB> => {
  try {
    console.log('Sending createWidgetB request with data:', widget);
    const response = await axios.post<ApiResponse<WidgetB>>(`${API_URL}/widget-b`, widget);
    console.log('createWidgetB response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error in createWidgetB:', error);
    throw handleApiError(error);
  }
};

export const getWidgetsB = async (page: number, limit: number): Promise<PaginatedResponse<WidgetB>> => {
  try {
    const response = await axios.get<ApiResponse<PaginatedResponse<WidgetB>>>(`${API_URL}/widget-b`, {
      params: { page, limit }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching widgets B:', error);
    throw handleApiError(error);
  }
};

export const getWidgetB = async (id: number): Promise<WidgetB> => {
  try {
    console.log('Sending getWidgetB request for id:', id);
    const response = await axios.get<ApiResponse<WidgetB>>(`${API_URL}/widget-b/${id}`);
    console.log('getWidgetB response:', response.data);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error in getWidgetB:', error);
    throw handleApiError(error);
  }
};

export const updateWidgetB = async (id: number, widget: Partial<WidgetBCreate>): Promise<WidgetB> => {
  try {
    console.log('Sending updateWidgetB request with data:', widget);
    const response = await axios.put<WidgetB>(`${API_URL}/widget-b/${id}`, widget);
    console.log('updateWidgetB response:', response.data);
    if (response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error in updateWidgetB:', error);
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