import React from 'react';
import DateFilter from './DateFilter';
import SelectFilter from './SelectFilter';
import InputNumberFilter from './InputNumberFilter';
import TagSelectFilter from './TagSelectFilter';
import { FilterProps } from './types';

interface FilterItemProps {
  disabled?: boolean;
  dimensions?: any[];
  tagValueType: number | string;
  conditionType: string;
  values: any[];
  onChange: (values: any[]) => void;
}

export default function FilterItem({
  disabled = false,
  dimensions,
  tagValueType,
  conditionType,
  values,
  onChange,
}: FilterItemProps) {
  let component = null;

  const props: FilterProps = {
    disabled,
    dimensions,
    conditionType,
    values,
    onChange,
  };
  switch (tagValueType) {
    case 1:
      component = <SelectFilter {...props} />;
      break;
    case 2:
      component = <InputNumberFilter {...props} />;
      break;
    case 3:
      component = <TagSelectFilter {...props} />;
      break;
    case 4:
      component = <DateFilter {...props} />;
      break;
  }

  return component;
}
