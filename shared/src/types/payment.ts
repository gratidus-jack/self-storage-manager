export type PaymentStatus = 'pending' | 'paid' | 'overdue';

export interface BillingPeriod {
  start: string;
  end: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  unitId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  billingPeriod: BillingPeriod;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  tenantId: string;
  unitId: string;
  amount: number;
  dueDate: string;
  billingPeriod: BillingPeriod;
}

export interface MarkPaymentPaidRequest {
  paidDate: string;
}

export interface PaymentFilters {
  status?: PaymentStatus;
  daysOverdue?: 'all' | '1-15' | '16-30' | '30+';
  startDate?: string;
  endDate?: string;
}

export interface LatePayment extends Payment {
  daysOverdue: number;
  tenantName: string;
  unitNumber: string;
}
