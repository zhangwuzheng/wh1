export enum SegmentType {
  GROUP = 'GROUP',
  POWER = 'POWER',
  SILICON = 'SILICON'
}

export interface MetricData {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  subValue?: string;
}

export interface TableColumn {
  header: string;
  accessor: string;
  align?: 'left' | 'center' | 'right';
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}