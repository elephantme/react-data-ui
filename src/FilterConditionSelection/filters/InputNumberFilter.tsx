import React from 'react';
import { Space, InputNumber } from 'antd';
import { FilterProps } from './types';

export default function InputNumberFilter({ conditionType, values, onChange }: FilterProps) {
  if (conditionType === 'between') {
    return (
      <Space>
        <InputNumber
          className={'ui-filter-input-number'}
          placeholder={'请输入'}
          value={values[0]}
          onChange={value => onChange([value, values[1]])}
        />
        <InputNumber
          className={'ui-filter-input-number'}
          placeholder={'请输入'}
          value={values[1]}
          onChange={value => onChange([values[0], value])}
        />
      </Space>
    );
  }
  return (
    <InputNumber placeholder={'请输入'} value={values[0]} onChange={value => onChange([value])} />
  );
}
