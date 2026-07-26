import { api } from './client';
import type { APIResponse } from './products';

export type PaymentMethod = 'CASH' | 'ESEWA' | 'BANKING';

export interface SaleItem {
  id: number;
  productId: number;
  productName: string;
  barcode: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: number;
  cashierName: string;
  cashierEmail: string;
  totalAmount: number;
  taxAmount: number;
  netAmount: number;
  paymentMethod: PaymentMethod;
  items: SaleItem[];
  createdAt: string;
}

export interface CreateSalePayload {
  items: { productId: number; quantity: number }[];
  paymentMethod: PaymentMethod;
  taxAmount?: number;
}

export const salesApi = {
  getAll: () =>
    api.get<APIResponse<Sale[]>>('/sales'),

  getById: (id: number) =>
    api.get<APIResponse<Sale>>(`/sales/${id}`),

  create: (payload: CreateSalePayload) =>
    api.post<APIResponse<Sale>>('/sales', payload),
};
