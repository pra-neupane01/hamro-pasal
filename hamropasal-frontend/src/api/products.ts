import { api } from './client';

export interface Product {
  productId: number;
  productName: string;
  description: string;
  sku: string;
  barcode: string;
  price: number;
  categoryName: string;
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface ProductFilters {
  productName?: string;
  categoryName?: string;
  minPrice?: string;
  maxPrice?: string;
  barcode?: string;
  sku?: string;
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  number: number;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

function buildQuery(filters: ProductFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.append(k, String(v));
  });
  const q = params.toString();
  return q ? `?${q}` : '';
}

export const productsApi = {
  getAll: (filters: ProductFilters = {}) =>
    api.get<APIResponse<PagedResponse<Product>>>(`/products${buildQuery(filters)}`),

  getById: (id: number) =>
    api.get<APIResponse<Product>>(`/products/${id}`),

  create: (data: {
    name: string; description?: string; sku: string; barcode: string;
    price: number; categoryId: number; quantity: number; warehouseLocation?: string;
  }) => api.post<APIResponse<Product>>('/products', data),

  update: (data: {
    productId: number; name?: string; description?: string; sku?: string;
    barcode?: string; price?: number;
  }) => api.put<APIResponse<Product>>('/products', data),

  delete: (id: number) =>
    api.delete<APIResponse<string>>(`/products/${id}`),

  getCategories: () =>
    api.get<APIResponse<Category[]>>('/category'),
};
