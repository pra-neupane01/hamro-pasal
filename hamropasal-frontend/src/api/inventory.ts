import { api } from './client';
import type { APIResponse } from './products';

export interface InventoryItem {
  inventoryId: number;
  productId: number;
  productName: string;
  sku: string;
  categoryName: string;
  quantityInStock: number;
  lowStockThreshold: number;
  warehouseLocation: string;
  lowStock: boolean;
}

export interface LowStockNotification {
  productId: number;
  productName: string;
  sku: string;
  currentValue: number;
  threshold: number;
}

export interface InventoryUpdateResponse {
  productId: number;
  productName: string;
  newQuantity: number;
}

export const inventoryApi = {
  getAll: () =>
    api.get<APIResponse<InventoryItem[]>>('/inventory'),

  getByProduct: (productId: number) =>
    api.get<APIResponse<InventoryItem>>(`/inventory/${productId}`),

  getLowStock: () =>
    api.get<APIResponse<LowStockNotification[]>>('/inventory/low-stock'),

  restock: (productId: number, quantity: number) =>
    api.post<APIResponse<InventoryUpdateResponse>>('/inventory/restock', { productId, quantity }),

  updateThreshold: (productId: number, threshold: number) =>
    api.patch<APIResponse<InventoryUpdateResponse>>('/inventory/threshold', { productId, threshold }),
};
