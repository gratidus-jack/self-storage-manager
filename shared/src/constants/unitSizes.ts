import type { UnitSize, UnitDimensions } from '../types/unit';

export interface UnitSizeDefinition {
  size: UnitSize;
  dimensions: UnitDimensions;
  monthlyRate: number;
  description: string;
}

export const UNIT_SIZE_DEFINITIONS: Record<UnitSize, UnitSizeDefinition> = {
  small: {
    size: 'small',
    dimensions: {
      width: 5,
      depth: 5,
      height: 8,
    },
    monthlyRate: 75,
    description: '5x5 - Small closet space',
  },
  medium: {
    size: 'medium',
    dimensions: {
      width: 10,
      depth: 10,
      height: 8,
    },
    monthlyRate: 150,
    description: '10x10 - One bedroom apartment',
  },
  large: {
    size: 'large',
    dimensions: {
      width: 10,
      depth: 20,
      height: 8,
    },
    monthlyRate: 250,
    description: '10x20 - Two bedroom house',
  },
};

export const UNIT_SIZES: UnitSize[] = ['small', 'medium', 'large'];

export const UNIT_FEATURES = [
  'climate-controlled',
  'ground-floor',
  'drive-up',
  '24-hour-access',
  'security-cameras',
  'indoor',
  'outdoor',
] as const;

export type UnitFeature = typeof UNIT_FEATURES[number];
