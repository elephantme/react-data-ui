import React, { useState, useCallback, useEffect } from 'react';
import { Space, Select } from 'antd';
import { tagNumberConditionList, tagStringConditionList } from './config';
import FilterItem from './filters';
import './styles';

const Option = Select.Option;

export interface IBaseField {
  name: string;
  value: string | number;
  fieldType: string;
}

export interface IValue {
  fieldId?: number | string;
  conditionType?: string;
  values?: Array<string | number>;
}

interface FilterConditionSelectProps {
  /**
   * @description 字段选择组件的类型，select表示下拉列表，tree-select表示树形下拉列表
   * @default select
   */
  fieldComponentType?: 'select' | 'tree-select';
  /**
   * @description 字段下拉列表数据
   */
  fieldOptions: IBaseField[];
  /**
   * @description 默认值
   */
  value?: IValue;
  /**
   * @description 字段的维度值列表
   */
  dimensions?: any[];
  /**
   * @description 回调函数
   */
  onChange: (value: IValue) => void;
}

const FilterConditionSelect: React.FC<FilterConditionSelectProps> = ({
  value = {},
  fieldOptions,
  dimensions,
  onChange,
}) => {
  const [fieldType, setFieldType] = useState<string>();
  const [conditionType, setConditionType] = useState<string>();
  const [values, setValues] = useState<any[]>([]);

  /**
   * 初始化:编辑时需要设置tag、conditionType、values
   */
  useEffect(() => {
    if (!value) return;
    const fieldId = value.fieldId;
    const field = fieldOptions.find((o: any) => o.value == fieldId);
    setFieldType(field?.fieldType);
    setConditionType(value.conditionType);
    setValues(value.values || []);
  }, [value, fieldOptions]);

  /**
   * 字段重新选择后，需要重置筛选条件和值
   */
  const onFieldSelect = useCallback(
    (fieldId, field: any) => {
      console.log(fieldId, field);
      setFieldType(field.fieldType);
      setConditionType(undefined);
      setValues([]);
      onChange({
        fieldId,
        conditionType: undefined,
        values: [],
      });
    },
    [setFieldType, setConditionType, setValues, onChange],
  );

  /**
   * 条件改变
   */
  const onConditionChange = useCallback(
    (conditionType: string) => {
      let updateValues = values;
      // between要清空values
      setConditionType(prev => {
        if (prev === 'between') {
          updateValues = [];
        }
        return conditionType;
      });
      onChange({
        fieldId: value.fieldId,
        conditionType,
        values: updateValues,
      });
    },
    [setConditionType, onChange, values, conditionType, value.fieldId],
  );

  /**
   * 筛选值改变
   */
  const onValuesChange = useCallback(
    (values: any) => {
      setValues(values);
      onChange({
        fieldId: value.fieldId,
        conditionType,
        values,
      });
    },
    [setValues, onChange, conditionType, value.fieldId],
  );

  /**
   * 根据字段类型动态获取条件列表
   */
  const getConditionOptions = useCallback(() => {
    const conditions =
      fieldType == '1' || fieldType == '3' ? tagStringConditionList : tagNumberConditionList;
    return conditions.map(o => (
      <Option value={o.value} key={o.value}>
        {o.name}
      </Option>
    ));
  }, [fieldType]);

  return (
    <Space>
      <Select
        className={'ui-filter-field-select'}
        value={value?.fieldId}
        placeholder={'请选择'}
        onChange={onFieldSelect}
      >
        {fieldOptions.map(o => (
          <Option key={o.value} value={o.value} fieldType={o.fieldType}>
            {o.name}
          </Option>
        ))}
      </Select>
      {/*条件选择*/}
      {
        <Select
          className={'ui-filter-condition-select'}
          value={conditionType}
          onChange={onConditionChange}
          placeholder={'请选择'}
        >
          {getConditionOptions()}
        </Select>
      }
      {/*值选择*/}
      {fieldType && conditionType && (
        <FilterItem
          dimensions={dimensions}
          tagValueType={Number(fieldType)}
          conditionType={conditionType}
          values={values}
          onChange={onValuesChange}
        />
      )}
    </Space>
  );
};

export default FilterConditionSelect;
