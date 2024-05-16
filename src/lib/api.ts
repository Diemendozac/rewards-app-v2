// lib/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(`${API_URL}${url}`);
  return response.data;
};

export const postRequest = async <T>(url: string, data: any): Promise<T> => {
  const response = await axios.post<T>(`${API_URL}${url}`, data);
  return response.data;
};
