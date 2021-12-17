import React from 'react';
import { Select } from 'antd';
import { FilterProps } from './types';
const Option = Select.Option;

export default function SelectFilter({ dimensions, values, onChange }: FilterProps) {
  return (
    <Select
      className={'ui-filter-field-select'}
      placeholder={'请选择'}
      value={values}
      mode={'multiple'}
      maxTagCount={5}
      optionLabelProp={'label'}
      onChange={onChange}
    >
      {dimensions?.map((o: any) => (
        <Option value={o} key={o}>
          {o}
        </Option>
      ))}
    </Select>
  );
}
