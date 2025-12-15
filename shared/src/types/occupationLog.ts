export type OccupationEventType = 'move-in' | 'move-out';

export interface OccupationLog {
  id: string;
  unitId: string;
  tenantId: string;
  eventType: OccupationEventType;
  eventDate: string;
  monthlyRateAtEvent: number;
  notes?: string;
  createdAt: string;
}

export interface CreateOccupationLogRequest {
  unitId: string;
  tenantId: string;
  eventType: OccupationEventType;
  eventDate: string;
  monthlyRateAtEvent: number;
  notes?: string;
}
