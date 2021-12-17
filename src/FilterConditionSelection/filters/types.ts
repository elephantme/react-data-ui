export interface FilterProps {
  disabled?: boolean;
  dimensions?: any[];
  conditionType: string;
  values: any[];
  onChange: (values: any[]) => void;
}
