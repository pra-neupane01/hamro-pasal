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
    api.get<APIResponse<Supplier[]>>('/suppliers'),

  getById: (id: number) =>
    api.get<APIResponse<Supplier>>(`/suppliers/${id}`),

  create: (data: { companyName: string; contactPerson: string; email?: string; phone: string; address?: string; city?: string; paymentTerms?: string }) =>
    api.post<APIResponse<Supplier>>('/suppliers', data),

  update: (id: number, data: Partial<{ companyName: string; contactPerson: string; email: string; phone: string; address: string; city: string; paymentTerms: string; active: boolean }>) =>
    api.put<APIResponse<Supplier>>(`/suppliers/${id}`, data),

  delete: (id: number) =>
    api.delete<APIResponse<void>>(`/suppliers/${id}`),

  search: (query: string) =>
    api.get<APIResponse<Supplier[]>>(`/suppliers/search?query=${encodeURIComponent(query)}`),
};
