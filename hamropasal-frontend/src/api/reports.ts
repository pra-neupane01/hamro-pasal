import { api } from './client';
import type { APIResponse } from './products';

export interface DashboardStats {
  totalProducts: number;
  totalCustomers: number;
  totalSuppliers: number;
  lowStockProducts: number;
  todaySales: number;
  todayTransactions: number;
  monthlyRevenue: number;
  totalInventoryValue: number;
}

export const reportsApi = {
  getDashboardStats: () =>
    api.get<APIResponse<DashboardStats>>('/api/v1/reports/dashboard/stats'),

  getMonthlyRevenue: () =>
    api.get<APIResponse<number>>('/api/v1/reports/monthly-revenue'),
};
