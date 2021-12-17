import React, { useCallback } from 'react';
import { DatePicker, Space } from 'antd';
import moment, { Moment } from 'moment';
import { FilterProps } from './types';

export default function DateFilter({ conditionType, values, onChange }: FilterProps) {
  const getDate = useCallback((date: string): Moment | null => {
    return date ? moment(date) : null;
  }, []);
  const disableDate = useCallback((current: Moment): boolean => {
    return current && current > moment().endOf('day');
  }, []);
  if (conditionType === 'between') {
    return (
      <Space>
        <DatePicker
          className={'ui-filter-datepicker'}
          placeholder={'请选择'}
          value={getDate(values[0])}
          disabledDate={disableDate}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          onChange={(value, strValue) => onChange([strValue, values[1]])}
        />
        <DatePicker
          className={'ui-filter-datepicker'}
          placeholder={'请选择'}
          value={getDate(values[1])}
          disabledDate={disableDate}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          onChange={(value, strValue) => onChange([values[0], strValue])}
        />
      </Space>
    );
  }
  return (
    <DatePicker
      className={'ui-filter-datepicker'}
      placeholder={'请选择'}
      value={getDate(values[0])}
      disabledDate={disableDate}
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      onChange={(value, strValue) => onChange([strValue])}
    />
  );
}
