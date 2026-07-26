import { api } from './client';
import type { APIResponse } from './products';

export interface Supplier {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentTerms: string;
  totalSupplied: number;
  active: boolean;
}

export const suppliersApi = {
  getAll: () =>
    api.get<APIResponse<Supplier[]>>('/api/v1/suppliers'),

  getById: (id: number) =>
    api.get<APIResponse<Supplier>>(`/api/v1/suppliers/${id}`),

  create: (data: { companyName: string; contactPerson: string; email?: string; phone: string; address?: string; city?: string; paymentTerms?: string }) =>
    api.post<APIResponse<Supplier>>('/api/v1/suppliers', data),

  update: (id: number, data: Partial<{ companyName: string; contactPerson: string; email: string; phone: string; address: string; city: string; paymentTerms: string; active: boolean }>) =>
    api.put<APIResponse<Supplier>>(`/api/v1/suppliers/${id}`, data),

  delete: (id: number) =>
    api.delete<APIResponse<void>>(`/api/v1/suppliers/${id}`),

  search: (query: string) =>
    api.get<APIResponse<Supplier[]>>(`/api/v1/suppliers/search?query=${encodeURIComponent(query)}`),
};
