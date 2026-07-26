import { api } from './client';
import type { APIResponse, PagedResponse } from './products';

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalPurchases: number;
  loyaltyPoints: number;
  active: boolean;
  createdAt: string;
}

export const customersApi = {
  getAll: (params: { search?: string; active?: boolean; page?: number; size?: number } = {}) => {
    const p = new URLSearchParams();
    if (params.search) p.set('search', params.search);
    if (params.active !== undefined) p.set('active', String(params.active));
    if (params.page !== undefined) p.set('page', String(params.page));
    if (params.size !== undefined) p.set('size', String(params.size));
    const q = p.toString();
    return api.get<APIResponse<PagedResponse<Customer>>>(`/api/v1/customers${q ? '?' + q : ''}`);
  },

  getById: (id: number) =>
    api.get<APIResponse<Customer>>(`/api/v1/customers/${id}`),

  create: (data: { fullName: string; email?: string; phone: string; address?: string; city?: string }) =>
    api.post<APIResponse<Customer>>('/api/v1/customers', data),

  update: (data: { id: number; fullName?: string; email?: string; phone?: string; address?: string; city?: string; active?: boolean }) =>
    api.put<APIResponse<Customer>>('/api/v1/customers', data),

  delete: (id: number) =>
    api.delete<APIResponse<void>>(`/api/v1/customers/${id}`),
};
