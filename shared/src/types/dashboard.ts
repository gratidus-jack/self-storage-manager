export interface MonthlyRevenue {
  collected: number;
  pending: number;
  overdue: number;
}

export interface DashboardSummary {
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  lateAccountsCount: number;
  totalOutstanding: number;
  monthlyRevenue: MonthlyRevenue;
}
