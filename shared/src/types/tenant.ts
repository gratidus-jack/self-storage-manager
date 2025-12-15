export type TenantStatus = 'active' | 'inactive';

export interface TenantAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: TenantAddress;
  unitId: string;
  moveInDate: string;
  moveOutDate?: string;
  monthlyRate: number;
  status: TenantStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: TenantAddress;
  unitId: string;
  moveInDate: string;
  monthlyRate: number;
}

export interface UpdateTenantRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: TenantAddress;
}

export interface OccupyUnitRequest {
  tenantFirstName: string;
  tenantLastName: string;
  email: string;
  phone: string;
  moveInDate: string;
  address?: TenantAddress;
}
