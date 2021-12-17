import React from 'react';
import { Select } from 'antd';
import { FilterProps } from './types';

export default function TagSelectFilter({ values, onChange }: FilterProps) {
  return (
    <Select
      className={'ui-filter-field-select'}
      placeholder={'请选择'}
      value={values}
      mode={'tags'}
      maxTagCount={5}
      onChange={onChange}
    ></Select>
  );
}
