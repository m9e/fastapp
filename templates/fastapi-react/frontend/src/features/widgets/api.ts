import axios from 'axios';
import { WidgetA, WidgetACreate, WidgetB, WidgetBCreate } from '../../types';

const API_URL = 'http://localhost:8000/api/widgets';

interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

// WidgetA functions
export const getWidgetsA = async (page: number, limit: number): Promise<PaginatedResponse<WidgetA>> => {
  const response = await axios.get(`${API_URL}/widget-a`, {
    params: { page, limit }
  });
  return response.data;
};

export const createWidgetA = async (widget: WidgetACreate): Promise<WidgetA> => {
  const response = await axios.post(`${API_URL}/widget-a`, widget);
  return response.data;
};

export const getWidgetA = async (id: number): Promise<WidgetA> => {
  const response = await axios.get(`${API_URL}/widget-a/${id}`);
  return response.data;
};

export const updateWidgetA = async (id: number, widget: Partial<WidgetACreate>): Promise<WidgetA> => {
  const response = await axios.put(`${API_URL}/widget-a/${id}`, widget);
  return response.data;
};

export const deleteWidgetA = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/widget-a/${id}`);
};
// WidgetB functions
export const getWidgetsB = async (page: number, limit: number): Promise<PaginatedResponse<WidgetB>> => {
  const response = await axios.get(`${API_URL}/widget-b`, {
    params: { page, limit }
  });
  return response.data;
};

export const createWidgetB = async (widget: WidgetBCreate): Promise<WidgetB> => {
  const response = await axios.post(`${API_URL}/widget-b`, widget);
  return response.data;
};

export const getWidgetB = async (id: number): Promise<WidgetB> => {
  const response = await axios.get(`${API_URL}/widget-b/${id}`);
  return response.data;
};

export const updateWidgetB = async (id: number, widget: Partial<WidgetBCreate>): Promise<WidgetB> => {
  const response = await axios.put(`${API_URL}/widget-b/${id}`, widget);
  return response.data;
};

export const deleteWidgetB = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/widget-b/${id}`);
};