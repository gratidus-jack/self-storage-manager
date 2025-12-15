export type UnitSize = 'small' | 'medium' | 'large';
export type UnitStatus = 'vacant' | 'occupied';

export interface UnitDimensions {
  width: number;
  depth: number;
  height: number;
}

export interface Unit {
  id: string;
  unitNumber: string;
  size: UnitSize;
  dimensions: UnitDimensions;
  monthlyRate: number;
  status: UnitStatus;
  currentTenantId?: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUnitRequest {
  unitNumber: string;
  size: UnitSize;
  dimensions: UnitDimensions;
  monthlyRate: number;
  features?: string[];
}

export interface UpdateUnitRequest {
  unitNumber?: string;
  size?: UnitSize;
  dimensions?: UnitDimensions;
  monthlyRate?: number;
  features?: string[];
}

export interface UnitFilters {
  size?: UnitSize | 'all';
  status?: UnitStatus | 'all';
}
